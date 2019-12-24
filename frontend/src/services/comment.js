import axios from 'axios';
import store from '@/store';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

apiClient.interceptors.request.use((config) => {
    const state = store.getState();
    const authToken = state.user.authToken;
    config.headers.Authorization = `Bearer ${authToken}`;
    return config;
});

export default {
    createComment(postId, commentData) {
        return apiClient.post('/comment', { ...commentData, postId });
    },
    updateComment(id, commentData) {
        return apiClient.post('/edit-comment', { id, ...commentData });
    },
    deleteComment(postId, commentId) {
        return apiClient.delete('/delete-comment', { data: { postId, commentId } });
    }
}
