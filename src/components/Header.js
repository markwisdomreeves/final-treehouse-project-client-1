import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "../styles/global.css";


export default ({ context }) => {

        const authUser = context.authenticatedUser;

        return (
            <div className="header">
                <div className="bounds">
                    <h1 className="header--logo responsive-header-text"><Link to={"/"}>REST API</Link></h1>
                    <nav id="signin_and_signup">
                         {/* If the authenticatedUser that is from the context API file is not null, the Header should change to welcome 
                         the user and display the sign out button.
                         But If the authenticatedUser is null, the sign up and sign in buttons are rendered, that means, they will not change. */}
                        {authUser ?
                            <Fragment>
                                <span>Welcome, {authUser.firstName}!</span>
                                <Link className="signout" to="/signout">Sign Out</Link>
                            </Fragment>
                        :
                            <Fragment>
                                <Link className="signup" to="/signup">
                                    Sign Up
                                </Link>
                                <Link className="signin" to="/signin">
                                    Sign In
                                </Link>
                           </Fragment>
                        }
                    </nav>
                </div>
            </div>
        );
};



