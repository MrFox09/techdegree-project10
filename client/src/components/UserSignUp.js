import React, {useState} from 'react';
import axios from 'axios';


function UserSignIn () {

  const [formInput, setFormInput] = useState({});

  // set the formInput when changed
  const handleChange = (event) =>{
    setFormInput({...formInput, [event.target.name]: event.target.value} );
    
  }; 




  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a POST request
    axios({
      method: 'post',
      url: 'http://localhost:5000/api/users',      
      headers: {'Content-Type':'application/json'},
      data: formInput
    })

    
  };

    return(

        <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <div>
            <form onSubmit={handleSubmit}>
              <div><input id="firstName" name="firstName" type="text"  placeholder="First Name" onChange={handleChange}  /></div>
              <div><input id="lastName" name="lastName" type="text"  placeholder="Last Name" onChange={handleChange}  /></div>
              <div><input id="emailAddress" name="emailAddress" type="text"  placeholder="Email Address"  onChange={handleChange} /></div>
              <div><input id="password" name="password" type="password"  placeholder="Password" onChange={handleChange}  /></div>
              <div><input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange}  /></div>
              <div className="grid-100 pad-bottom"><button className="button" type="submit" >Sign Up</button><button className="button button-secondary" href='/'>Cancel</button></div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Already have a user account? <a href="/signin">Click here</a> to sign in!</p>
        </div>
      </div>


    );


}


export default UserSignIn;