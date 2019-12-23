import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getDetails, addComment, removeComment, updateComment } from '@/store/currentPost/operations';
import { currentPostActions } from '@/store/currentPost';
import PostComment from '@/components/PostComment';
import CommentForm from '@/components/CommentForm';

const Post = ({ history }) => {
    const dispatch = useDispatch();
    const { id: postId } = useParams();
    const [isEditMode, setEditMode] = useState(false);
    const [commentToEditId, setCommentToEditId] = useState(null);

    const details = useSelector(state => state.currentPost.details);
    const isLoading = useSelector(state => state.currentPost.isLoading);
    const userId = useSelector(state => state.user.userId);
    const isAuth = useSelector(state => state.user.isAuth);

    useEffect(() => {
        dispatch(currentPostActions.setLoadingStatus(true));
        dispatch(getDetails(postId))
            .then(() => {
                dispatch(currentPostActions.setLoadingStatus(false));
            })
            .catch(err => {
                const errorMessage = err.message;
                toast.error(errorMessage);
                history.push('/');
            });
    }, [postId, dispatch, history]);

    const {
        title,
        imageUrl,
        content,
        createdAt,
        author,
        comments
    } = details;

    const handleFormSubmit = formData => {
        if (isEditMode) {
            dispatch(updateComment(commentToEditId, formData))
                .then(message => {
                    setEditMode(false);
                    toast.success(message);
                })
                .catch(err => {
                    const errorMessage = err.message;
                    toast.error(errorMessage);
                });
        } else {
            dispatch(addComment(postId, formData))
                .then(message => {
                    toast.success(message);
                })
                .catch(err => {
                    const errorMessage = err.message;
                    toast.error(errorMessage);
                });
        }
    };

    const handleDelete = commentId => {
        setEditMode(false);
        dispatch(removeComment(postId, commentId))
            .then(message => {
                toast.success(message);
            })
            .catch(err => {
                const errorMessage = err.message;
                toast.error(errorMessage);
            });
    };

    const handleUpdate = commentId => {
        setEditMode(true);
        setCommentToEditId(commentId);
    };

    const initialValues = isEditMode ? { content: comments.find(comment => comment._id === commentToEditId).content } : {};

    return (
        <div className="container">
            {
                isLoading ?
                    <p>Loading...</p>
                :
                    <div>
                        <img className="img-fluid mb-3" src={imageUrl} alt="" />
                        <h1>{ title }</h1>
                        <hr />
                        <p>{ content }</p>
                        <p>
                            <small>Created at { createdAt.split('T')[0] } by { author.name }</small>
                        </p>
                        <hr style={{ borderColor: '#303030' }} />
                        {
                            isAuth &&
                            <CommentForm
                                initialValues={initialValues}
                                onSubmit={handleFormSubmit}
                                isEditMode={isEditMode}
                            />
                        }
                        {
                            comments.length > 0 ?
                                <div style={{ marginTop: 15 }}>
                                    <p><strong>Comments ({ comments.length }):</strong></p>
                                    <ul className="list-group">
                                        {
                                            comments
                                                .sort((comA, comB) => new Date(comB.createdAt) - new Date(comA.createdAt))
                                                .map(comment => (
                                                    <PostComment
                                                        key={comment._id}
                                                        comment={comment}
                                                        onDelete={handleDelete}
                                                        onUpdate={handleUpdate}
                                                        editable={comment.author._id === userId}
                                                        removable={comment.author._id === userId}
                                                    />
                                                ))
                                        }
                                    </ul>
                                </div>
                            :
                                <p style={{ marginTop: 15 }}>There are no comments...</p>
                        }
                    </div>
            }
        </div>
    );
};

export default Post;
