import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Form from './Form';


export default class UserSignIn extends Component {
  state = {
    emailAddress: '',
    password: '',
    isPasswordShownOne: false,
    errors: [],
  };

  // Show and Hide Password Function
  togglePasswordShownOne = () => {
    const { isPasswordShownOne } = this.state;
    this.setState({ isPasswordShownOne: !isPasswordShownOne });
  }

  render() {
    const { isPasswordShownOne } = this.state;
    const eye = <FontAwesomeIcon icon={faEye} />;
    const {
      emailAddress,
      password,
      errors,
    } = this.state;

    return (
      <div className="bounds sign-in-form-responsive-button-container">
        <div className="grid-33 centered signin my-custom-style">
          <h1>Sign In</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
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
              </React.Fragment>
            )} />
            <div className="my-custom-account-text">
                <p>
                   Don't have a user account? <Link to="/signup">Click here</Link> to sign up!
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
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { emailAddress, password } = this.state;
    context.actions.signIn(emailAddress, password)
      .then( user => {
        if (user === null) {
          this.setState(() => {
            return { errors: ['Input Fields are not valid']};
          });
        } else {
          this.props.history.push(from);
        }
    })
    .catch( err => {
      console.log(err);
      this.props.history.push('/error');
    })
  }


  cancel = () => {
    this.props.history.push('/');
  }
}
