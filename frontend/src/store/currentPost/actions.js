import types from './types';

const set = item => ({ type: types.SET_POST, item });
const setLoadingStatus = status => ({ type: types.SET_LOADING_STATUS, status });
const addComment = comment => ({ type: types.ADD_COMMENT, comment });
const deleteComment = id => ({ type: types.DELETE_COMMENT, id });
const updateComment = item => ({ type: types.UPDATE_COMMENT, item });

export default {
    set,
    setLoadingStatus,
    addComment,
    deleteComment,
    updateComment
}
