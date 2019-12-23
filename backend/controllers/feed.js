const fs = require('fs');
const path = require('path');

const Post = require('../models/post');
const User = require('../models/user');

exports.getPosts = (req, res, next) => {
    Post.find()
        .populate([
            {
                path: 'author',
                select: 'name'
            },
            {
                path: 'comments'
            }
        ])
        .sort({ createdAt: 'desc' })
        .exec()
        .then(posts => {
            if (!posts) {
                const error = new Error('Could not find posts!')
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ posts });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.createPost = (req, res, next) => {
    const {
        file,
        body: {
            title,
            content,
            imageUrl
        }
    } = req;

    if (!file) {
        const error = new Error('No image provided!')
        error.statusCode = 404;
        throw error;
    }

    let author;

    const post = new Post({
        title,
        content,
        imageUrl: `${process.env.APP_DOMAIN + file.path}`,
        author: req.userId
    });

    post.save()
        .then(result => {
            return User.findById(req.userId);
        })
        .then(user => {
            console.log('POST CREATED!');
            author = user;
            user.posts.push(post);
            return user.save();
        })
        .then(result => {
            Post.populate(post, { path: 'author', select: 'name' }, (error, post) => {
                res.status(201).json({
                    message: 'Post created successfully!',
                    post
                });
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.getPost = (req, res, next) => {
    const { id } = req.params;

    Post.findById(id)
        .populate([
            {
                path: 'author',
                select: 'name'
            },
            {
                path: 'comments',
                populate: {
                    path: 'author',
                    select: 'name'
                }
            }
        ])
        .exec()
        .then(post => {
            if (!post) {
                const error = new Error('Could not find post!')
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ message: 'Post found!', post });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updatePost = (req, res, next) => {
    const {
        file,
        params: { id },
        body: { title, content }
    } = req;

    Post.findById(id)
        .populate([
            {
                path: 'author',
                select: 'name'
            },
            {
                path: 'comments'
            }
        ])
        .exec()
        .then(post => {
            if (!post) {
                const error = new Error('Could not find post!')
                error.statusCode = 404;
                throw error;
            }

            if (post.author._id.toString() !== req.userId) {
                const error = new Error('Not authorized!')
                error.statusCode = 403;
                throw error;
            }

            post.title = title;
            if (file) {
                clearImage(post.imageUrl.split(process.env.APP_DOMAIN)[1]);
                post.imageUrl = `${process.env.APP_DOMAIN + file.path}`;
            }
            post.content = content;

            return post.save();
        })
        .then(result => {
            console.log('POST UPDATED!');
            res.status(200).json({ message: 'Post updated!', post: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deletePost = (req, res, next) => {
    const { id } = req.body;

    Post.findById(id)
        .then(post => {
            if (!post) {
                const error = new Error('Could not find post!')
                error.statusCode = 404;
                throw error;
            }

            if (post.author.toString() !== req.userId) {
                const error = new Error('Not authorized!')
                error.statusCode = 403;
                throw error;
            }

            clearImage(post.imageUrl.split(process.env.APP_DOMAIN)[1]);
            return Post.findByIdAndRemove(id);
        })
        .then(result => {
            return User.findById(req.userId);
        })
        .then(user => {
            user.posts.pull(id);
            return user.save();
        })
        .then(result => {
            console.log('POST DELETED!');
            res.status(200).json({ message: 'Post deleted successfully!' });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

const clearImage = filePath => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath);
};
