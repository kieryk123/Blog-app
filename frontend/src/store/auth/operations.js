import { toast } from 'react-toastify';
import actions from './actions';
import authService from '@/services/auth';

// login
export const login = (formData) =>
    (dispatch) => {
        return authService.login(formData)
            .then(response => {
                return response.data;
            })
            .then(result => {
                const { name, token, userId, message } = result;
                const authData = { name, token, userId };
                dispatch(actions.setName(name));
                dispatch(actions.setUserId(userId));
                dispatch(actions.setToken(token));
                dispatch(actions.login());
                toast.success(message);
                return authData;
            })
            .then(authData => {
                const { name, token, userId } = authData;

                if (formData.keepLoggedIn) {
                    localStorage.setItem('authToken', token);
                    localStorage.setItem('userId', userId);
                    localStorage.setItem('name', name);
                    const remainingMiliseconds = 60 * 60 * 1000;
                    const expiryDate = new Date(new Date().getTime() + remainingMiliseconds).toISOString();
                    localStorage.setItem('expiryDate', expiryDate);
                }
            })
            .catch(err => {
                const errorMessage = err.response.data.message;
                throw new Error(errorMessage);
            });
    }

// try auto login
export const tryAutoLogin = () =>
    (dispatch) => {
        const authToken = localStorage.getItem('authToken');
        const userId = localStorage.getItem('userId');
        const expiryDate = localStorage.getItem('expiryDate');
        const name = localStorage.getItem('name');
        const isAuthdataInStorage = (authToken && userId && expiryDate && name) ? true : false;
        const isTokenExpired = (new Date() > new Date(expiryDate)) ? true : false;

        if (isAuthdataInStorage && !isTokenExpired) {
            dispatch(actions.setName(name));
            dispatch(actions.setUserId(userId));
            dispatch(actions.setToken(authToken));
            dispatch(actions.login());
        }
    }
