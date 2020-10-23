import React from 'react';
import { Link } from 'react-router-dom';


function Header ({...props}) {

  let {authenticated,authenticatedUser} = props;


  
    return(

        
        <div className="header">
          <div className="bounds">
            <h1 className="header--logo">Courses</h1>
            <nav>
            {
              authenticated ?
              <React.Fragment>
                <span>Welcome, {authenticatedUser.emailAddress}!</span>
                <Link to="/signout">Sign Out</Link>
              </React.Fragment> 
            :
              <React.Fragment>
                <Link className="signup" to="/signup">Sign Up</Link>
                <Link className="signin" to="/signin">Sign In</Link>
              </React.Fragment>
            }
            </nav>
          </div>
        </div>


    );
}  


export default Header;