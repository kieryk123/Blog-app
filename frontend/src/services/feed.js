import axios from 'axios';
import store from '@/store';

const apiClient = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/feed`
});

export default {
    getPosts() {
        return apiClient.get('/posts');
    },
    getSinglePost(id) {
        return apiClient.get(`/post/${id}`);
    },
    createPost(postData) {
        const state = store.getState();
        const authToken = state.user.authToken;

        return apiClient.post('/post', postData, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
    },
    updatePost(id, postData) {
        const state = store.getState();
        const authToken = state.user.authToken;

        return apiClient.post(`/edit-post/${id}`, postData, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
    },
    deletePost(id) {
        const state = store.getState();
        const authToken = state.user.authToken;

        return apiClient.delete('/delete-post', {
            headers: {
                'Authorization': `Bearer ${authToken}`
            },
            data: { id }
        });
    }
}
