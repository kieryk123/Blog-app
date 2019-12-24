import axios from 'axios';
import store from '@/store';

const apiClient = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/feed`
});

apiClient.interceptors.request.use((config) => {
    const state = store.getState();
    const authToken = state.user.authToken;
    config.headers.Authorization = `Bearer ${authToken}`;
    return config;
});

export default {
    getPosts() {
        return apiClient.get('/posts');
    },
    getSinglePost(id) {
        return apiClient.get(`/post/${id}`);
    },
    createPost(postData) {
        return apiClient.post('/post', postData);
    },
    updatePost(id, postData) {
        return apiClient.post(`/edit-post/${id}`, postData);
    },
    deletePost(id) {
        return apiClient.delete('/delete-post', { data: { id } });
    }
}
