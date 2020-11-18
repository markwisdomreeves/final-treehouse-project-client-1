import React, {Component, Fragment} from "react";
import Form from "./Form";


class UpdateCourse extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            description: "",
            estimatedTime: "",
            materialsNeeded: "",
            firstName: "",
            lastName: "",
            userId: "",
            courseId: "",
            userArray: [],
            errors: [],
        };
    }


    // We are calling the courseDetailsInfoFunction in a componentDidMount lifeCycle method
    componentDidMount() {
        this.courseDetailsInfoFunction();
    }

    courseDetailsInfoFunction() {
        const {context } = this.props;

        /* We are calling the getCourseDetails method from the data.js to 
        get all the course details from our REST API and display them in them 
        their input fields*/
        context.data.getCourseDetails(this.props.match.params.id)
            .then((course =>  {
                if (course) {
                    this.setState({
                        title: course.title,
                        description: course.description,
                        estimatedTime: course.estimatedTime,
                        materialsNeeded: course.materialsNeeded,
                        courseId: course.id,
                        userArray: course.User,
                        userId: course.userId,
                    })
                }
            }))
            .catch((err) => {
                console.log(err);
                this.props.history.push("/error");
            });

    }



    render() {
        // Here, we are destructuring all the data that we need to use.
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            errors,
        } = this.state;

        
        return(
            <div className="bounds course--detail">
                <h1>Update Course</h1>
                <div>
                    <Form 
                     cancel={this.cancel}
                     errors={errors}
                     submit={this.submit}
                     submitButtonText="Update Course"
                     elements={() => (
                         <Fragment>
                             <div className="grid-66">
                                <div className="course--header">
                                    <h4 className="course--label">Course</h4>
                                    <div>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            className="input-title course--title--input"
                                            value={title}
                                            onChange={this.change}
                                            placeholder="Course title..."
                                            autoComplete="off"
                                        />
                                    </div>
                                    <p>By {this.state.userArray.firstName}{" "}{this.state.userArray.lastName}</p>
                                </div>
                                <div className="course--description">
                                    <div>
                                        <input
                                            type="text"
                                            id="description"
                                            name="description"
                                            className=""
                                            value={description}
                                            onChange={this.change}
                                            placeholder="Course description..."
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>
                             </div>
                             <div className="grid-25 grid-right">
                             <div className="course--stats">
                                    <ul className="course--stats--list">
                                        <li className="course--stats--list--item">
                                            <h4>Estimated Time</h4>
                                            <div>
                                                <input
                                                    type="text"
                                                    id="estimatedTime"
                                                    name="estimatedTime"
                                                    className="course--time--input"
                                                    value={estimatedTime}
                                                    onChange={this.change}
                                                    placeholder="Hours"
                                                    autoComplete="off"
                                                />
                                            </div>
                                        </li>
                                        <li className="course--stats--list--item">
                                            <h4>Materials Needed</h4>
                                            <div>
                                                <input
                                                    type="text"
                                                    id="materialsNeeded"
                                                    name="materialsNeeded"
                                                    className="course--time--input"
                                                    value={materialsNeeded}
                                                    onChange={this.change}
                                                    placeholder="Materials"
                                                    autoComplete="off"
                                                />
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                             </div>
                         </Fragment>
                     )}

                    />

                </div>
            </div>
        )
    }


    // Onchange method input value
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name]: value
            };
        });
    };


    // submit form input data method
    submit =() => {
        /* We are getting our data from our REST API with the help of the 
        data.js file through our context API file to update the user data in the form */
        const { context } = this.props;
        
        // we are getting user authentication;
        const authUser = context.authenticatedUser;
        const emailAddress = authUser.emailAddress;
        const password = authUser.password;

        // deconstructing the data from state
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            courseId,
            userId,
            errors,
        } = this.state;

        // We are creating a new payload to update our form data
        const course = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            courseId,
            userId,
            errors,
        };

        /* Now, and finally We are calling the update Course method 
        from the Data.js through the help of the context API to update our user form data */
        context.data.getUpdateCourse(courseId, course, emailAddress, password)
            .then(errors => {
                if (errors.length) {
                    this.setState({
                        errors
                    });
                } else {
                    // else, than we redirect the user to the details page
                    this.props.history.push("/courses/" + courseId);
                }
            })
            .catch((err) => {
                console.log(err);
                // If there is an error, then catch it and redirect the user to the error page
                this.props.history.push("/error");
            })

    }
        

        // cancel method
        cancel = () => {
            const courseId = this.props.match.params.id;
            const { from } = this.props.location.state || { from: { pathname: `/courses/${courseId}` } };
            this.props.history.push(from);
        };
    

}


export default UpdateCourse;