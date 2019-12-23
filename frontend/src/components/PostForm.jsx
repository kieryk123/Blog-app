import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';

const PostForm = ({ onSubmit, initialValues, editMode }) => {
    const [image, setImage] = useState();

    useEffect(() => {
        if (editMode) {
            setImage(initialValues.imageUrl);
        }
    }, [editMode, initialValues]);

    const transformDataAndSubmit = data => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);
        if (data.image) {
            formData.append('image', data.image);
        }

        onSubmit(formData);
    };

    const handleFileInputChange = e => {
        const imageObj = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(imageObj);
        reader.onloadend = () => setImage(reader.result);
    };

    return (
        <Form
            onSubmit={transformDataAndSubmit}
            initialValues={initialValues}
            render={({ handleSubmit, pristine, invalid, form }) => (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <Field
                            component="input"
                            type="text"
                            name="title"
                            className="form-control"
                            id="title"
                            placeholder="Enter title"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Image</label>
                        <Field name="image">
                            {
                                () =>
                                    <input
                                        className="form-control"
                                        id="image"
                                        type="file"
                                        onChange={(e) => {
                                            form.change('image', e.target.files[0]);
                                            handleFileInputChange(e);
                                        }}
                                    />
                            }
                        </Field>
                        <img className="img-fluid" src={image} alt=""/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <Field
                            component="textarea"
                            type="text"
                            name="content"
                            className="form-control"
                            id="content"
                            placeholder="Enter content"
                            rows="4"
                        />
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
}

PostForm.defaultProps = {
    initialValues: {},
    isEditMode: false
};

PostForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
    isEditMode: PropTypes.bool
};

export default PostForm;
