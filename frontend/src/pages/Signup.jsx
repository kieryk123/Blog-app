import React from 'react';
import { toast } from 'react-toastify';
import SignupForm from '@/components/SignupForm';
import authService from '@/services/auth';

const Signup = ({ history }) => {
    const handleFormSubmit = formData => {
        authService.signup(formData)
            .then(response => {
                const message = response.data.message;
                toast.success(message);
                history.push('/login');
            })
            .catch(err => {
                toast.error(err.message);
            });
    };

    return (
        <div className="container">
            <h1>Create account</h1>
            <hr/>
            <SignupForm onSubmit={handleFormSubmit} />
        </div>
    );
};

export default Signup;
