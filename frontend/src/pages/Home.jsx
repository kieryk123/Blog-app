import React from 'react';
import { useSelector } from 'react-redux';
import PostCard from '@/components/PostCard';

const Home = () => {
    const posts = useSelector(state => state.posts.list.slice().sort((postA, postB) => new Date(postB.createdAt) - new Date(postA.createdAt)));
    const isLoading = useSelector(state => state.posts.isLoading);

    return (
        <div className="container">
            <h1>Home page</h1>
            <hr/>
            {
                isLoading ?
                    <p>Loading...</p>
                :
                    posts.length > 0 ?
                        <div>
                            <h2 className="mb-3">Recent posts:</h2>
                            {posts.map(post => <PostCard key={post._id} post={post} />)}
                        </div>
                    :
                        <p>There are no posts...</p>
            }
        </div>
    );
};

export default Home;
