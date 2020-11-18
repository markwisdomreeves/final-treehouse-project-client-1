import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

const Context = React.createContext();

export class Provider extends Component {

  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null
  };

  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    const { authenticatedUser } = this.state;
    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut
      },
    };
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    );
  }

//Sign in method
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    if (user !== null) { 
      user.password = password;
      this.setState(() => {
        return {
          authenticatedUser: user,
        };
      });
      const cookieData = {
        expires: 1
      };
      // Setting the cookies to preserve User SignUp and SignIn Data in memory to 1 day
      Cookies.set('authenticatedUser', JSON.stringify(user), cookieData);
    }
    return user;
  };


//sign out method
  signOut = () => {
    // If the user clicks sign out button, we remove authenticated user from state
    this.setState({ authenticatedUser: null });
    //remove stored cookies
    Cookies.remove('authenticatedUser'); 
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}
