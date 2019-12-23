import types from './types';

const INITIAL_STATE = {
    list: [],
    isLoading: true
};

const postsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.ADD_POST:
            return {
                ...state,
                list: [ ...state.list, action.item ]
            };
        case types.UPDATE_POST:
            const postToEditIndex = state.list.findIndex(el => el._id === action.id);
            const newPostsList = state.list.map((el, index) => {
                if (index !== postToEditIndex) {
                    return { ...el };
                } else {
                    return { ...action.item };
                }
            });

            return {
                ...state,
                list: newPostsList
            };
        case types.DELETE_POST:
            const filteredPostsList = state.list.filter(el => el._id !== action.id);
            
            return {
                ...state,
                list: filteredPostsList
            };
        case types.SET_POSTS:
            return {
                ...state,
                list: action.list
            };
        case types.SET_LOADING_STATUS:
            return {
                ...state,
                isLoading: action.status
            };
        default:
            return state;
    }
};

export default postsReducer;
