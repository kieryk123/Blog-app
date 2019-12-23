import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';

const LoginForm = ({ onSubmit }) => {
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
                    <div className="form-group form-check">
                        <Field
                            component="input"
                            type="checkbox"
                            name="keepLoggedIn"
                            className="form-check-input"
                            id="keepLoggedIn"
                        />
                        <label className="form-check-label" htmlFor="keepLoggedIn">
                            Keep me logged in
                        </label>
                    </div>
                    <button
                        disabled={pristine || invalid}
                        type="submit"
                        className="btn btn-primary"
                    >
                        Submit
                    </button>
                </form>
            )}
        />
    );
};

LoginForm.propTypes = {
    onSubmit: PropTypes.func
};

export default LoginForm;
