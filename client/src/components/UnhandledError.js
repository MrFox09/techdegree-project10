import React from 'react';
import {Link} from 'react-router-dom';


function UnhandledError () {
    return(

        <div class="bounds">
        <h1>Error</h1>
        <p>Sorry! We just encountered an unexpected error.</p>
        <Link className="button" to={`/`}>Back</Link>
      </div>
    );
}


export default UnhandledError;