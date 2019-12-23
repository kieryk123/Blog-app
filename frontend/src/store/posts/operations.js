import actions from './actions';
import feedService from '@/services/feed';

// get all posts
export const getAllPosts = () =>
    (dispatch) => {
        return feedService.getPosts()
            .then(response => {
                return response.data.posts;
            })
            .then(posts => {
                dispatch(actions.set(posts));
            })
            .catch(err => {
                const errorMessage = err.response.data.message;
                throw new Error(errorMessage);
            });
    }

// add post
export const addPost = (formData) =>
    (dispatch) => {
        return feedService.createPost(formData)
            .then(response => {
                return response.data;
            })
            .then(result => {
                const { post, message } = result;
                dispatch(actions.add(post));
                return message;
            })
            .catch(err => {
                const errorMessage = err.response.data.message;
                throw new Error(errorMessage);
            });

    }

// update post
export const editPost = (id, formData) =>
    (dispatch) => {
        return feedService.updatePost(id, formData)
            .then(response => {
                return response.data;
            })
            .then(result => {
                const { post, message } = result;
                dispatch(actions.update(id, post));
                return message;
            })
            .catch(err => {
                const errorMessage = err.response.data.message;
                throw new Error(errorMessage);
            });
    }

// delete post
export const removePost = (id) =>
    (dispatch) => {
        return feedService.deletePost(id)
            .then(response => {
                return response.data.message;
            })
            .then(message => {
                dispatch(actions.deletePost(id));
                return message;
            })
            .catch(err => {
                const errorMessage = err.response.data.message;
                throw new Error(errorMessage);
            });
    }
