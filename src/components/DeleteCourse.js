import React, { Component } from 'react';
import "./DeletePopUpButton.css";


class DeleteCourse extends Component {
    state = {
        showPupUp: false,
        course: {}
    }


/* the cancel delete Action method is user to allow to user to cancel
the delete action, for example when the user refuses to delete a course */
cancelDeleteAction = () => {
    const { id } = this.props.match.params;
    this.props.history.push(`/courses/` + id);
}

/* this method is used to popup a YES or NO options to the user */
togglePopUpMethod = () => {
    this.setState({
        showPupUp: !this.state.showPupUp
    });
}

// We are calling getCourseDetailsFunction method when the component is mounted
componentDidMount() {
    this.getCourseDetailsFunction();
}

/* We are calling the getCourseDetails method from the Data.js
with the help of our Context API file */
getCourseDetailsFunction() {
    const { context } = this.props;
    const { id } = this.props.match.params;
    context.data.getCourseDetails(id)
        .then(response => {
           if (response) {
               this.setState({
                id: response.id,
                emailAddress: context.authenticatedUser.emailAddress,
                password: context.authenticatedUser.password
               })
           } else {
               this.props.history.push("/notfound");
           }
        })
        .catch(err => {
            console.log(err);
            this.props.history.push("/error");
        });           

}

/* We are calling the Delete Course Data Method from the Data.js to delete a single course
with the help of our Context API file */
comfirmDeleteSingleCourse = (event) => {
    event.preventDefault();
    const { context } = this.props;
    const { id, emailAddress, password } = this.state;

    context.data.deleteSingleCourse(id, emailAddress, password)
        .then((errors) => {
            if (errors.length) {
                this.props.history.push("/forbidden");
            } else {
                this.props.history.push("/courses" + id);
            }
        })
        .catch(err => {
            console.log(err);
            this.props.history.push("/");
        });
    
}


    render() {
        return(
            <div className="popup_container">
                <div className="popup_inner" id="inner-container">
                   <h3 className="delete-header">Do you really want to do this?</h3>
                   <button className="button_background_color" onClick={this.comfirmDeleteSingleCourse}>Yes</button>
                   <button className="button_background_color" onClick={this.cancelDeleteAction}>No</button>
                </div>
            </div>
        );
    }
}

export default DeleteCourse;