import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';


import Header from './components/Header';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import Courses from "./components/Courses";
import CreateCourse from "./components/CreateCourse";
import CourseDetail from "./components/CourseDetail";
import UpdateCourse from "./components/UpdateCourse";
import DeleteCourse from "./components/DeleteCourse";
import NotFound from "./components/NotFound";
import UnhandledError from "./components/UnhandledError";
import Forbidden from "./components/Forbidden";

// import ExampleDeleteCourse from "./components/ExampleDeleteCourse";

// SIGNIN, SIGNUP AND SIGNOUT AUTHENTICATION SECTION
import withContext from "./Context";
import PrivateRoute from "./PrivateRoute";

const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CoursesWithContext = withContext(Courses);
const CreateCourseWithContext = withContext(CreateCourse);
const CourseDetailWithContext = withContext(CourseDetail);
const UpdateCourseWithContext = withContext(UpdateCourse);
const DeleteCourseWithContext = withContext(DeleteCourse);


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <HeaderWithContext />

          <Switch>
            {/* <Route path="/delete" component={ExampleDeleteCourse} /> */}
            <Route exact path="/"
              render={() => 
              <Redirect to="/courses"/>}
            />
            <Route exact path="/courses" component={CoursesWithContext} />
            <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
            <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
            <PrivateRoute path="/courses/delete/:id" component={DeleteCourseWithContext} />
            <Route path="/courses/:id" component={CourseDetailWithContext} />
            <Route path="/signin" component={UserSignInWithContext} />
            <Route path="/signup" component={UserSignUpWithContext} />
            <Route path="/signout" component={UserSignOutWithContext} />
            <Route path="/notfound" component={NotFound} />
            <Route path="/forbidden" component={Forbidden} />
            <Route path="/error" component={UnhandledError} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    )
  }
}


export default App;
