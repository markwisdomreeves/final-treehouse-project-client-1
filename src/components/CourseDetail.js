import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

class CourseDetail extends Component {
  constructor(props) {
    super(props);
      this.state = {
        materialDetails: [],
        user: {},
        courseItems: {},
    };
  }

  componentDidMount() {
    this.courseDetailFunc();
  }

  courseDetailFunc() {
    const { context } = this.props;
    const { id } = this.props.match.params;

    /* We are calling the getCourseDetails method from our Data file with the help of
    Context API to display the course details of eack course */
    context.data
      .getCourseDetails(id)
      .then((response) => {
        if (response) {
          let materialsNeeded = response.materialsNeeded;
          if (materialsNeeded !== null) {
            materialsNeeded = materialsNeeded.split("\n");
          } else {
            materialsNeeded = [];
          }

          this.setState({
            user: response.User,
            courseItems: response,
            materialDetails: materialsNeeded,
            authenticatedUser: context.authenticatedUser,
          });
        } else {
          this.props.history.push("/error");
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    const {
      courseItems,
      user,
      materialDetails,
      authenticatedUser,
    } = this.state;

    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              <span>
                {authenticatedUser ? (
                  authenticatedUser.emailAddress === user.emailAddress ? (
                    
                    // If the user is login, this is the only time that they 
                    // can be allowed to DELETE or UPDATE courses
                    <React.Fragment>
                      <Link
                        className="button"
                        to={`/courses/${courseItems.id}/update`}
                      >
                        Update Course
                      </Link>
                      <Link
                        className="button"
                        to={`/courses/delete/${courseItems.id}`}
                      >
                        Delete Course
                      </Link>
                    </React.Fragment>
                  ) : (
                    <hr />
                  )
                ) : (
                  <hr />
                )}
              </span>
              <Link className="button button-secondary" to="/">
                Return to List
              </Link>
            </div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h4 className="course--title" id="my-custom-header-style">{courseItems.title}</h4>
              <p>
                By {" "} {user.firstName} {user.lastName}
              </p>
            </div>
            <div className="course--description">
              <ReactMarkdown>{courseItems.description}</ReactMarkdown>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{courseItems.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                    {materialDetails.map((material, index) => (
                      <li key={index}>{material}</li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default CourseDetail;
