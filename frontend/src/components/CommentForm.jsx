import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';

const CommentForm = ({
    onSubmit,
    initialValues,
    isEditMode
}) => {
    const formTitle = isEditMode ? 'Edit comment' : 'Add comment';
    const formSubmitText = isEditMode ? 'Update' : 'Submit';

    return (
        <Form
            onSubmit={onSubmit}
            initialValues={initialValues}
            render={({ handleSubmit, pristine, invalid, form }) => (
                <form onSubmit={values => {
                        handleSubmit(values);
                        form.change('content', ''); // reset field "content", this way because form.reset() brings back initialValues
                    }
                }>
                    <div className="form-group">
                        <label htmlFor="content">{ formTitle }</label>
                        <Field
                            component="textarea"
                            type="text"
                            name="content"
                            className="form-control"
                            id="content"
                            placeholder="Enter comment content"
                            rows="4"
                        />
                    </div>
                    <button
                        disabled={pristine || invalid}
                        type="submit"
                        className="btn btn-primary"
                    >
                        { formSubmitText }
                    </button>
                </form>
            )}
        />
    );
};

CommentForm.defaultProps = {
    initialValues: {},
    isEditMode: false
};

CommentForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
    isEditMode: PropTypes.bool
};

export default CommentForm;
