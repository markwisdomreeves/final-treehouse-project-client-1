import React from 'react';

export default (props) => {
    const {
        cancel,
        errors,
        submit,
        submitButtonText,
        elements,
    } = props;

    function handleSubmit(event) {
        event.preventDefault();
        submit();
    }

    function handleCancel(event) {
        event.preventDefault();
        cancel();
    }

    return (
        <div className="custom-form-container">
            <ErrorsDisplay errors={errors} />
            <form onSubmit={handleSubmit}>
                {elements()}
                <div className="pad-bottom create-new-course-responsive-layout-button-parent">
                    <button className="button create-new-course-responsive-layout-button" type="submit" 
                    id="my-custom-button-style">{submitButtonText}</button>
                    <button className="button create-new-course-responsive-layout-button
                    button-secondary my-custom-button-style" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}
// method for correctly displaying a list of errors from API
function ErrorsDisplay({ errors }) {
    let errorsDisplay = null;

    if (errors.length) {
        errorsDisplay = (
            <div>
                <h2 className="validation--errors--label">Validation errors</h2>
                <div className="validation-errors">
                    <ul>
                        {errors.map((error, i) => <li key={i}>{error}</li>)}
                    </ul>
                </div>
            </div>
        );
    }

    return errorsDisplay;
}
