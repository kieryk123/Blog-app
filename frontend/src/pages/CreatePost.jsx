import React from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import PostForm from '@/components/PostForm';
import { addPost } from '@/store/posts/operations';

const CreatePost = ({ history }) => {
    const dispatch = useDispatch();

    const handleFormSubmit = (formData) => {
        dispatch(addPost(formData))
            .then(message => {
                history.push('/my-posts');
                toast.success(message);
            })
            .catch(err => {
                const errorMessage = err.message;
                toast.error(errorMessage);
            });
    };

    return (
        <div className="container">
            <h1>Create new post</h1>
            <hr/>
            <PostForm onSubmit={handleFormSubmit} />
        </div>
    );
};

export default withRouter(CreatePost);
