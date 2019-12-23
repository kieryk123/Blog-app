import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';

const SignupForm = ({ onSubmit }) => {
    return (
        <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, pristine, invalid }) => (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <Field
                            component="input"
                            type="email"
                            name="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <Field
                            component="input"
                            type="name"
                            name="name"
                            className="form-control"
                            id="name"
                            placeholder="Name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Field
                            component="input"
                            type="password"
                            name="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                        />
                    </div>
                    <button
                        disabled={pristine || invalid}
                        type="submit"
                        className="btn btn-primary"
                    >
                        Sign up
                    </button>
                </form>
            )}
        />
    );
};

SignupForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default SignupForm;
