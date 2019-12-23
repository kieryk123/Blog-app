import types from './types';

const INITIAL_STATE = {
    details: {},
    isLoading: true
};

const currentPostReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.SET_POST:
            return {
                ...state,
                details: action.item
            };
        case types.SET_LOADING_STATUS:
            return {
                ...state,
                isLoading: action.status
            };
        case types.ADD_COMMENT:
            const newComments = [...state.details.comments];
            newComments.push(action.comment);

            return {
                ...state,
                details: {
                    ...state.details,
                    comments: newComments
                }
            };
        case types.DELETE_COMMENT:
            const filteredComments = state.details.comments.filter(comment => comment._id !== action.id);

            return {
                ...state,
                details: {
                    ...state.details,
                    comments: filteredComments
                }
            };
        case types.UPDATE_COMMENT:
            const commentToEditIndex = state.details.comments.findIndex(comment => comment._id === action.item._id);
            const updatedComments = state.details.comments.map((comment, index) => {
                if (index !== commentToEditIndex) {
                    return { ...comment };
                } else {
                    return { ...action.item };
                }
            });

            return {
                ...state,
                details: {
                    ...state.details,
                    comments: updatedComments
                }
            };
        default:
            return state;
    }
};

export default currentPostReducer;
