import React from 'react';
import { toast } from 'react-toastify';
import LoginForm from '@/components/LoginForm';
import { useDispatch } from 'react-redux';
import { login } from '@/store/auth/operations';

const Login = ({ history }) => {
    const dispatch = useDispatch();

    const handleFormSubmit = formData => {
        dispatch(login(formData))
            .then(() => {
                history.push('/');
            })
            .catch(err => {
                const errorMessage = err.message;
                toast.error(errorMessage);
            });
    };

    return (
        <div className="container">
            <h1>Login</h1>
            <p>You have to be logged in and authorized to create, update and delete content on this blog page.</p>
            <hr/>
            <LoginForm onSubmit={handleFormSubmit} />
        </div>
    );
};

export default Login;
