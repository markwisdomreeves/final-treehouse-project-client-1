import React from 'react';
import { Link } from "react-router-dom";


function UnhandledError () {

    return (
        <div className="bounds centered">
            <h1 className="error-page-header">
                Error
            </h1>
            <p className="error-page-paragraph">
              Ohhh, Sorry. We have encountered problem with our server'.
            </p>
            <div className="error-page-btn">
                <Link to="/">return home</Link>
            </div>
        </div>
    ) 
}


export default UnhandledError;

