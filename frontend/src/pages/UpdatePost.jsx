import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import PostForm from '@/components/PostForm';
import { getDetails } from '@/store/currentPost/operations';
import { editPost } from '@/store/posts/operations';
import { currentPostActions } from '@/store/currentPost';

const UpdatePost = ({ history }) => {
    const dispatch = useDispatch();
    const { id: postId } = useParams();
    const details = useSelector(state => state.currentPost.details);
    const isLoading = useSelector(state => state.currentPost.isLoading);

    useEffect(() => {
        dispatch(currentPostActions.setLoadingStatus(true));
        dispatch(getDetails(postId))
            .then(() => {
                dispatch(currentPostActions.setLoadingStatus(false));
            })
            .catch(err => {
                const errorMessage = err.message;
                toast.error(errorMessage);
            });
    }, [postId, dispatch]);

    const handleFormSubmit = (formData) => {
        dispatch(editPost(postId, formData))
            .then(message => {
                history.push('/my-posts');
                toast.success(message);
            })
            .catch(err => {
                const errorMessage = err.message;
                toast.error(errorMessage);
            });
    }

    const initialValues = {
        title: details.title,
        imageUrl: details.imageUrl,
        content: details.content
    };

    return (
        <div className="container">
            <h1>Update post</h1>
            <hr/>
            {
                isLoading ?
                    <p>Loading...</p>
                :
                    <PostForm
                        onSubmit={handleFormSubmit}
                        initialValues={initialValues}
                        editMode
                    />
            }
        </div>
    );
};

export default withRouter(UpdatePost);
