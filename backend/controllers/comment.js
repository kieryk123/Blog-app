const Comment = require('../models/comment');
const Post = require('../models/post');

exports.getComments = (req, res, next) => {
    const { postId } = req.body;

    Post.findById(postId)
        .select('comments -_id')
        .populate({
            path: 'comments',
            populate: {
                path: 'author',
                select: 'name'
            }
        })
        .sort({ createdAt: 'desc' })
        .exec()
        .then(post => {
            if (!post) {
                const error = new Error('Could not find comments!')
                error.statusCode = 404;
                throw error;
            }

            res.status(200).json({ message: 'Comments found!', comments: post.comments });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.createComment = (req, res, next) => {
    const { postId, content } = req.body;
    const comment = new Comment({ content, author: req.userId });

    comment.save()
        .then(result => {
            return Post.findById(postId);
        })
        .then(post => {
            post.comments.push(comment);
            return post.save();
        })
        .then(result => {
            console.log('COMMENT CREATED!');
            Comment.populate(comment, { path: 'author', select: 'name' }, (error, comment) => {
                res.status(201).json({
                    message: 'Comment created succesfully!',
                    comment
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

exports.updateComment = (req, res, next) => {
    const { id, content } = req.body;

    Comment.findById(id)
        .populate('author', 'name')
        .exec()
        .then(comment => {
            if (!comment) {
                const error = new Error('Could not find comment!')
                error.statusCode = 404;
                throw error;
            }

            if (comment.author._id.toString() !== req.userId) {
                const error = new Error('Not authorized!')
                error.statusCode = 403;
                throw error;
            }

            comment.content = content;
            return comment.save();
        })
        .then(result => {
            console.log('COMMENT UPDATED!');
            res.status(200).json({ message: 'Comment updated!', comment: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteComment = (req, res, next) => {
    const { postId, commentId } = req.body;

    Comment.findById(commentId)
        .then(comment => {
            if (!comment) {
                const error = new Error('Could not find comment!')
                error.statusCode = 404;
                throw error;
            }

            if (comment.author.toString() !== req.userId) {
                const error = new Error('Not authorized!')
                error.statusCode = 403;
                throw error;
            }

            return Comment.findByIdAndRemove(commentId);
        })
        .then(result => {
            return Post.findById(postId);
        })
        .then(post => {
            post.comments.pull(commentId);
            return post.save();
        })
        .then(result => {
            console.log('COMMENT DELETED!');
            res.status(200).json({ message: 'Comment deleted successfully!', id: commentId });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
