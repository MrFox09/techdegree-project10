import React from 'react';
import {Link} from 'react-router-dom';


function NotFound () {
    return(

        <div class="bounds">
        <h1>Not Found</h1>
        <p>Sorry! We couldn't find the page you're looking for.</p>
        <Link className="button" to={`/`}>Back</Link>
      </div>
    );
}


export default NotFound;