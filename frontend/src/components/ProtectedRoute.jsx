import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({
    path,
    redirectPath,
    children
}) => {
    const isAuth = useSelector(state => state.user.isAuth);
    return (
        <Route path={path}>
            {
                isAuth ? (
                    children
                )
                : (
                    <Redirect to={redirectPath} />
                )
            }
        </Route>
    );
};

ProtectedRoute.defaultProps = {
    path: '/',
    redirectPath: '/'
};

ProtectedRoute.propTypes = {
    path: PropTypes.string.isRequired,
    redirectPath: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired
};

export default ProtectedRoute;
