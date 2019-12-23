import axios from 'axios';

const apiClient = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/auth`
});

export default {
    login(authData) {
        return apiClient.post('/login', authData);
    },
    signup(authData) {
        return apiClient.put('/signup', authData);
    }
}
