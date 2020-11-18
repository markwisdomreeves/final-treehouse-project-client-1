import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Form from './Form';

export default class UserSignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    isPasswordShownOne: false,
    isPasswordShownTwo: false,
    errors: [],
  }

  // Show and Hide Password Function
  togglePasswordShownOne = () => {
    const { isPasswordShownOne } = this.state;
    this.setState({ isPasswordShownOne: !isPasswordShownOne });
  }
  togglePasswordShownTwo = () => {
    const { isPasswordShownTwo } = this.state;
    this.setState({ isPasswordShownTwo: !isPasswordShownTwo });
  }


  render() {
    const { isPasswordShownOne } = this.state;
    const { isPasswordShownTwo } = this.state;
    const eye = <FontAwesomeIcon icon={faEye} />;
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
      errors,
    } = this.state;

    
    return (
      <div className="bounds sign-up-form-responsive-button-container">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <Fragment>
                <input 
                  id="firstName" 
                  name="firstName" 
                  type="text"
                  autoComplete="off"
                  value={firstName} 
                  onChange={this.change} 
                  placeholder="First Name"
                 />
                <input 
                  id="lastName" 
                  name="lastName" 
                  type="text"
                  autoComplete="off"
                  value={lastName} 
                  onChange={this.change} 
                  placeholder="Last Name" 
                />
                <input 
                  id="emailAddress" 
                  name="emailAddress" 
                  type="text"
                  autoComplete="off"
                  value={emailAddress} 
                  onChange={this.change} 
                  placeholder="Email Address" 
                />
                <div className="password-wrapper">
                  <input 
                    id="password" 
                    name="password"
                    type={isPasswordShownOne ? "text" : "password"}
                    autoComplete="off"
                    value={password} 
                    onChange={this.change} 
                    placeholder="Password" 
                  />
                  <i onClick={this.togglePasswordShownOne}>{eye}</i>
                </div>

                <div className="password-wrapper">
                  <input 
                    id="confirmPassword" 
                    name="confirmPassword"
                    type={isPasswordShownTwo ? "text" : "password"}
                    autoComplete="off"
                    value={confirmPassword} 
                    onChange={this.change} 
                    placeholder="Confirm Password" 
                  />
                  <i onClick={this.togglePasswordShownTwo}>{eye}</i>
              </div>
              </Fragment>
            )} />
            <div className="my-custom-account-text">
                <p>
                    Already have a user account? <Link to="/signin">Click here</Link> to sign in!
                </p>
            </div>
        </div>
      </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    const { context } = this.props;
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
    } = this.state;

    // New user payload
    const user = {
      firstName, 
      lastName,
      emailAddress,
      password,
      confirmPassword,
    };
    if (password !== confirmPassword) {
      this.setState({
        errors: ["Confirm Password Field is Invalid"],
      });
    } else {
      context.data.createUser(user)
        .then( errors => {
          if (errors.length) {
            this.setState({ errors: errors });
          } else {
            context.actions.signIn(emailAddress, password)
              .then(() => {
                this.props.history.push("/courses");
          });   
        } 
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push('/error');
      });
    }
    
  };


  cancel = () => {
    this.props.history.push('/');
  }
}
