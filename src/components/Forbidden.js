import React, {Fragment} from 'react';
import { Link } from "react-router-dom";


//To use when the requested course to edit or delete aren't owned by the user
function Forbidden () {
    
    return (
        <Fragment>
            <div className="actions--bar">
                <div className="bounds">
                    <div className="grid-100">
                        <Link className="button button-secondary" to="/">Return to List</Link>
                    </div>
                </div>
            </div>
            <div className="bounds course--detail">
                <h1>Forbidden</h1>
                <p>Oh oh! You can't access this page. It seems that you're not the owner of this course. 
                    You can only edit or delete courses that you've created.</p>
            </div>
        </Fragment>
    )
};


export default Forbidden;
