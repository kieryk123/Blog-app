import React from 'react';
import PropTypes from 'prop-types';

const PostComment = ({
    comment: {
        _id,
        content,
        author: { name: authorName },
        createdAt
    },
    onDelete,
    onUpdate,
    editable,
    removable
}) => {
    return (
        <div className="card">
            <div className="card-body">
                <p className="card-text">{ content }</p>
            </div>
            <div className="d-flex justify-content-between align-items-center px-4 pb-3">
                <small className="text-muted">Posted at { createdAt.split('T')[0] } by { authorName }</small>
                {
                    (editable || removable) &&
                    <span>
                        {
                            editable &&
                            <button
                                onClick={() => onUpdate(_id)}
                                className="btn btn-primary"
                            >Edit</button>
                        }
                        {
                            removable &&
                            <button
                                onClick={() => onDelete(_id)}
                                style={{ marginLeft: 5 }}
                                className="btn btn-danger"
                            >Delete</button>
                        }
                    </span>
                }
            </div>
        </div>
    );
};

PostComment.defaultProps = {
    comment: PropTypes.shape({
        _id: PropTypes.string,
        content: PropTypes.string,
        author: PropTypes.object,
        createdAt: PropTypes.string
    }),
    editable: false,
    removable: false
};

PostComment.propTypes = {
    comment: PropTypes.object.isRequired,
    onDelete: PropTypes.func,
    onUpdate: PropTypes.func,
    editable: PropTypes.bool,
    removable: PropTypes.bool
};

export default PostComment;
