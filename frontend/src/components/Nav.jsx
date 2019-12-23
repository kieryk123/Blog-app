import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { authActions } from '@/store/auth';

const Nav = ({ title, links }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const isAuth = useSelector(state => state.user.isAuth);
    const userName = useSelector(state => state.user.name);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <Link
                to="/"
                className="navbar-brand"
                onClick={() => setOpen(false)}
            >{ title }</Link>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
                onClick={() => setOpen(!open)}
            >
                <span className="navbar-toggler-icon"/>
            </button>
            <div className={`collapse navbar-collapse ${ open ? 'show' : '' }`}>
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    {
                        links.map((link, index) => (
                            !link.requireAuth && <li key={index} className="nav-item">
                                <Link
                                    to={link.to}
                                    className="nav-link"
                                    onClick={() => setOpen(false)}
                                >{ link.name }</Link>
                            </li>
                        ))
                    }
                    {
                        isAuth && links.map((link, index) => (
                            link.requireAuth && <li key={index} className="nav-item">
                                <Link
                                    to={link.to}
                                    className="nav-link"
                                    onClick={() => setOpen(false)}
                                >{ link.name }</Link>
                            </li>
                        ))
                    }
                </ul>
                {
                    isAuth &&
                    <div className="my-2 my-lg-0">
                        <span className="navbar-text mr-3">Hey, { userName }!</span>
                        <button
                            onClick={() => dispatch(authActions.logout())}
                            className="btn btn-primary my-2 my-sm-0"
                        >Logout</button>
                    </div>
                }
            </div>
        </nav>
    );
};

Nav.defaultProps = {
    title: 'Blog',
    links: []
};

Nav.propTypes = {
    title: PropTypes.string.isRequired,
    links: PropTypes.array.isRequired
};

export default Nav;
