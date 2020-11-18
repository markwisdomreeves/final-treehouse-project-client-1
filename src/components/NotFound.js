import React from 'react';
import "./page-not-found.css";
import { Link } from "react-router-dom";


function NotFound () {

    return(
        <div className="bounds">
            <div id="error-page">
                <div className="content">
                    <h1 data-text="404">404</h1>
                    <h4 data-text="Opps! Page not found">Opps! Page not found</h4>
                    <p>Sorry, the page you're looking for doesn't exist. You might be asseting the wrong page.</p>
                    <div className="page-not-found-btn">
                    <Link to="/">return home</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default NotFound;