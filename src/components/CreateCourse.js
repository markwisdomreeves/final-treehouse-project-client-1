import React, {Component, Fragment}  from 'react';
import Form from "./Form";


class CreateCourse extends Component {
    state = {
      title: '',
      description: '',
      estimatedTime: '',
      materialsNeeded: '',
      userId: '',
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
      errors: [],
    };

    /* We are using the componentDidMount lifecycle hook 
    to get out data from the API DATA HOUSE file (Data.js)*/
    componentDidMount(){
        const { context } = this.props;

        this.setState(() => {
            return {
                userId: context.authenticatedUser.id,
                firstName: context.authenticatedUser.firstName,
                lastName: context.authenticatedUser.lastName,
            };
        });
    };


    render(){
        const {
            firstName,
            lastName,
            errors,
        } = this.state;
        return (
            <div className="bounds course--detail main-custom-responsive-layout">
              <h1 className="responsive-create-course-header">Create a Course</h1>
              <div className="create-new-course-responsive-layout-container">
                <Form
                  cancel={this.cancel}
                  errors={errors}
                  submit={this.submit}
                  submitButtonText="Create Course"
                  elements={() => (
                    <Fragment>
                      <div className="grid-66 create-course-responsive-layout">
                        <div className="course--header">
                          <h4 className="course--label">Course</h4>
                          <div>
                            <input
                              id="title"
                              name="title"
                              type="text"
                              className="input-title course--title--input my-custom-responsive-input-style"
                              placeholder="Course title..."
                              onChange={this.change}
                              autoComplete="off"
                            />
                          </div>
                          <p>By {firstName}{" "}{lastName}</p>
                        </div>
                        <div className="course--description">
                          <div>
                            <textarea
                              id="description"
                              name="description"
                              className=""
                              placeholder="Course description..."
                              onChange={this.change}
                              autoComplete="off"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="grid-25 grid-right create-course-responsive-layout">
                        <div className="course--stats">
                          <ul className="course--stats--list">
                            <li className="course--stats--list--item">
                              <h4>Estimated Time</h4>
                              <div>
                                <input
                                  id="estimatedTime"
                                  name="estimatedTime"
                                  type="text"
                                  className="course--time--input my-custom-responsive-input-style"
                                  placeholder="Hours"
                                  onChange={this.change}
                                  autoComplete="off"
                                />
                              </div>
                            </li>
                            <li className="course--stats--list--item">
                              <h4>Materials Needed</h4>
                              <div>
                                <textarea
                                  id="materialsNeeded"
                                  name="materialsNeeded"
                                  className=""
                                  placeholder="List materials..."
                                  onChange={this.change}
                                  autoComplete="off"
                                ></textarea>
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
        );
    }

    // onChange method for all form inputs
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState(() => {
        return {
            [name]: value,
        };
        });
    };

    // form submit method
    submit = () => {
        const { context } = this.props;
        const authUser = context.authenticatedUser;
        const emailAddress = authUser.emailAddress;
        const password = authUser.password;

        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId,
            errors,
        } = this.state;

        // payload for a New course
        const newCourse = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId,
            errors,
        };

        /* We are calling the createCourse method from our Data file with Context API
         here to create a new course with authentication permissions */
        context.data
            .createNewCourse(emailAddress, password, newCourse)
            .then( errors => {
                if (errors.length) {
                    this.setState({ errors });
                } else {

                    /* console.log a successful message and then redirect send the User
                    to the main page after successfully creating a new course */
                    console.log("You have successfully created a New Course");
                    this.props.history.push("/courses");
                }
            })
            .catch((err) => { 
                console.log(err);
                this.props.history.push("/error");
            });

        };


    // cancel method
    cancel = () => {
        const { from } = this.props.location.state || { from: { pathname: "/" } };
        this.props.history.push(from);
    }

}


export default  CreateCourse;
