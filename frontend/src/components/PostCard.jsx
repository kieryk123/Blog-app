import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PostCard = ({
    post: {
        _id,
        imageUrl,
        title,
        content,
        createdAt,
        author: { name: authorName }
    },
    editable,
    removable,
    onDelete
}) => {
    return (
        <div className="card mb-3">
            <img src={imageUrl} className="card-img-top" alt=""/>
            <div className="card-body">
                <h5 className="card-title">{ title }</h5>
                <p className="card-text">{ content }</p>
                <p className="card-text">
                    <small className="text-muted">Created at { createdAt.split('T')[0] } by { authorName }</small>
                </p>
                <Link to={`/post/${_id}`} className="btn btn-primary">Read more</Link>
            </div>
            {
                (editable || removable) &&
                <div className="card-footer d-flex flex-row justify-content-between">
                    { editable && <Link to={`/update/${_id}`} className="btn btn-secondary">Edit</Link> }
                    { removable && <button onClick={() => onDelete(_id)} type="button" className="btn btn-danger">Delete</button> }
                </div>
            }
        </div>
    );
};

PostCard.defaultProps = {
    post: {},
    editable: false,
    removable: false
};

PostCard.propTypes = {
    post: PropTypes.shape({
        _id: PropTypes.string,
        title: PropTypes.string,
        content: PropTypes.string,
        imageUrl: PropTypes.string,
        author: PropTypes.object,
        createdAt: PropTypes.string
    }),
    editable: PropTypes.bool,
    removable: PropTypes.bool,
    onDelete: PropTypes.func
};

export default PostCard;
