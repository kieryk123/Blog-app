import types from './types';

const INITIAL_STATE = {
    isAuth: false,
    userId: null,
    name: null,
    authToken: null
};

const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.LOGIN:
            return {
                ...state,
                isAuth: true
            };
        case types.SET_NAME:
            return {
                ...state,
                name: action.name
            };
        case types.SET_AUTH_TOKEN:
            return {
                ...state,
                authToken: action.token
            };
        case types.SET_USER_ID:
            return {
                ...state,
                userId: action.userId
            };
        case types.LOGOUT:
            localStorage.removeItem('authToken');
            localStorage.removeItem('userId');
            localStorage.removeItem('expiryDate');
            localStorage.removeItem('name');

            return {
                ...state,
                userId: null,
                name: null,
                authToken: null,
                isAuth: false
            };
        default:
            return state;
    }
};

export default authReducer;
