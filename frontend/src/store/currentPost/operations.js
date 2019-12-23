import actions from './actions';
import feedService from '@/services/feed';
import commentService from '@/services/comment';

// get single post details
export const getDetails = (id) =>
    (dispatch) => {
        return feedService.getSinglePost(id)
            .then(response => {
                return response.data.post;
            })
            .then(post => {
                dispatch(actions.set(post));
            })
            .catch(err => {
                const errorMessage = err.response.data.message;
                throw new Error(errorMessage);
            });
    };

// create comment
export const addComment = (postId, formData) =>
    (dispatch) => {
        return commentService.createComment(postId, formData)
            .then(response => {
                return response.data;
            })
            .then(result => {
                const { comment, message } = result;
                dispatch(actions.addComment(comment));
                return message;
            })
            .catch(err => {
                const errorMessage = err.response.data.message;
                throw new Error(errorMessage);
            });
    };

// delete comment
export const removeComment = (postId, commentId) =>
    (dispatch) => {
        return commentService.deleteComment(postId, commentId)
            .then(response => {
                return response.data;
            })
            .then(result => {
                const { id, message } = result;
                dispatch(actions.deleteComment(id));
                return message;
            })
            .catch(err => {
                const errorMessage = err.response.data.message;
                throw new Error(errorMessage);
            });
    };

// update comment
export const updateComment = (id, content) =>
    (dispatch) => {
        return commentService.updateComment(id, content)
            .then(response => {
                return response.data;
            })
            .then(result => {
                const { comment, message } = result;
                dispatch(actions.updateComment(comment));
                return message;
            })
            .catch(err => {
                const errorMessage = err.response.data.message;
                throw new Error(errorMessage);
            });
    };
