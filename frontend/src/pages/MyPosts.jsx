import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import PostCard from '@/components/PostCard';
import { removePost } from '@/store/posts/operations';

const MyPosts = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.list);
    const isLoading = useSelector(state => state.posts.isLoading);
    const userId = useSelector(state => state.user.userId);

    const handleDelete = id => {
        dispatch(removePost(id))
            .then(message => {
                toast.success(message);
            })
            .catch(err => {
                const errorMessage = err.message;
                toast.error(errorMessage);
            });
    };

    return (
        <div className="container">
            <h1>My posts page</h1>
            <hr/>
            {
                isLoading ?
                    <p>Loading...</p>
                :
                    posts.length > 0 ?
                        <div>
                            <h2 className="mb-3">Your posts:</h2>
                            {
                                posts
                                    .sort((postA, postB) => new Date(postB.createdAt) - new Date(postA.createdAt))
                                    .filter(post => post.author._id.toString() === userId).map(post =>
                                        <PostCard
                                            key={post._id}
                                            post={post}
                                            editable
                                            removable
                                            onDelete={handleDelete}
                                        />
                                    )
                            }
                        </div>
                    :
                        <p>You have no posts...</p>
            }
        </div>
    );
};

export default MyPosts;
