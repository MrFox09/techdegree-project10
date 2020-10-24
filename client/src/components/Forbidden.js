import React from 'react';
import {Link} from 'react-router-dom';


function Forbidden () {
    return(

        <div class="bounds">
        <h1>Forbidden</h1>
        <p>Oh oh! You can't access this page.</p>
        <Link className="button" to={`/`}>Back</Link>
      </div>
    );
}


export default Forbidden;