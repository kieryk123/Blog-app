import types from './types';

const add = item => ({ type: types.ADD_POST, item });
const set = list => ({ type: types.SET_POSTS, list });
const update = (id, item) => ({ type: types.UPDATE_POST, item, id });
const deletePost = id => ({ type: types.DELETE_POST, id });
const setLoadingStatus = status => ({ type: types.SET_LOADING_STATUS, status });

export default {
    add,
    set,
    update,
    deletePost,
    setLoadingStatus
}
