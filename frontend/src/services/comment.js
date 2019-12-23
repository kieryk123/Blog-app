import axios from 'axios';
import store from '@/store';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

export default {
    createComment(postId, commentData) {
        const state = store.getState();
        const authToken = state.user.authToken;

        return apiClient.post('/comment', { ...commentData, postId }, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
    },
    updateComment(id, commentData) {
        const state = store.getState();
        const authToken = state.user.authToken;

        return apiClient.post('/edit-comment', { id, ...commentData }, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
    },
    deleteComment(postId, commentId) {
        const state = store.getState();
        const authToken = state.user.authToken;

        return apiClient.delete('/delete-comment', {
            headers: {
                'Authorization': `Bearer ${authToken}`
            },
            data: { postId, commentId }
        });
    }
}
