import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllPosts } from '@/store/posts/operations';
import { postsActions } from '@/store/posts';
import { tryAutoLogin } from '@/store/auth/operations';

// components
import Nav from '@/components/Nav';
import ProtectedRoute from '@/components/ProtectedRoute';

// pages
import Home from '@/pages/Home';
import About from '@/pages/About';
import Login from '@/pages/Login';
import Post from '@/pages/Post';
import CreatePost from '@/pages/CreatePost';
import UpdatePost from '@/pages/UpdatePost';
import MyPosts from '@/pages/MyPosts';
import Signup from '@/pages/Signup';
import NotExist from '@/pages/NotExist';

toast.configure({
    position: 'top-right',
    autoClose: 3500,
    hideProgressBar: true,
    newestOnTop: true,
    closeOnClick: true,
    rtl: false,
    pauseOnVisibilityChange: true,
    draggable: true,
    pauseOnHover: true
});


const navLinks = [
    {
        name: 'Home',
        to: '/',
        requireAuth: false
    },
    {
        name: 'My posts',
        to: '/my-posts',
        requireAuth: true
    },
    {
        name: 'About',
        to: '/about',
        requireAuth: false
    },
    {
        name: 'Create post',
        to: '/create',
        requireAuth: true
    },
    {
        name: 'Sign up',
        to: '/signup',
        requireAuth: false
    },
    {
        name: 'Login',
        to: '/login',
        requireAuth: false
    }
];

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(tryAutoLogin());
        dispatch(postsActions.setLoadingStatus(true));
        dispatch(getAllPosts())
            .then(() => {
                dispatch(postsActions.setLoadingStatus(false));
            })
            .catch(err => {
                const errorMessage = err.message;
                toast.error(errorMessage);
            });
    }, [dispatch]);

    return (
        <Router>
            <Nav
                title="Blog"
                links={navLinks}
            />
            <div className="container" style={{ marginTop: 70 }}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/login" component={Login} />
                    <Route path="/post/:id" component={Post} />
                    <ProtectedRoute path="/create" redirectPath="/">
                        <CreatePost />
                    </ProtectedRoute>
                    <ProtectedRoute path="/update/:id" redirectPath="/">
                        <UpdatePost />
                    </ProtectedRoute>
                    <ProtectedRoute path="/my-posts" redirectPath="/">
                        <MyPosts />
                    </ProtectedRoute>
                    <Route component={NotExist} />
                </Switch>
            </div>
            <footer className="container p-3">
                <hr />
                <p className="text-right">Created with &#x2665; by Paweł Kieryk</p>
            </footer>
        </Router>
    );
};

export default App;
