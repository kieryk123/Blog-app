import types from './types';

const setName = name => ({ type: types.SET_NAME, name });
const setToken = token => ({ type: types.SET_AUTH_TOKEN, token });
const setUserId = userId => ({ type: types.SET_USER_ID, userId });
const logout = () => ({ type: types.LOGOUT });
const login = () => ({ type: types.LOGIN });

export default {
    setName,
    setToken,
    setUserId,
    logout,
    login
}
