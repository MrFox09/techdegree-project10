import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';



function UserSignUp (props) {

  const {signIn} = props;
  const history = useHistory();

  const [formInput, setFormInput] = useState({
    firstName: "",
    lastName: "",
    emailAddress:"",
    password:""
  });
  const [errors, setErrors] = useState([]);

  // set the formInput when changed
  const handleChange = (event) =>{
    setFormInput({...formInput, [event.target.name]: event.target.value} );
    
  }; 



  // calls the api to create a new user
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send a POST request

   const response = await fetch('http://localhost:5000/api/users',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',        
        },
        body: JSON.stringify(formInput)

      }    
    );

    if(response.status === 201) {
      await signIn(formInput.emailAddress, formInput.password);
      history.push('/');

    }

    else if(response.status === 400) {
      response.json()
        .then(data => {
          if(data.message){
            setErrors([data.message])            
          }else{
            let validationErrors = data.errors;
            validationErrors = validationErrors.map(x => x.message);
            setErrors(validationErrors);
          }

        })
        .catch(err=> {
          history.push('/error');
          console.log(err);
        } );
    }     
  };

  // if there are errors returns the error component
  function ErrorsDisplay({ errors }) {
    let errorsDisplay = null;
  
    if (errors.length) {
      errorsDisplay = (
        <div>
          <h2 className="validation--errors--label">Validation errors</h2>
          <div className="validation-errors">
            <ul>
              {errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>
          </div>
        </div>
      );
    }
    return errorsDisplay;
  }

    // handle the redirect when the cancel button is clicked
    const redirect = () =>{ history.push('/')};

    return(

        <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <div>
          <ErrorsDisplay errors={errors} />
            <form onSubmit={handleSubmit}>
              <div><input id="firstName" name="firstName" type="text"  placeholder="First Name" onChange={handleChange}  /></div>
              <div><input id="lastName" name="lastName" type="text"  placeholder="Last Name" onChange={handleChange}  /></div>
              <div><input id="emailAddress" name="emailAddress" type="text"  placeholder="Email Address"  onChange={handleChange} /></div>
              <div><input id="password" name="password" type="password"  placeholder="Password" onChange={handleChange}  /></div>
              <div><input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange}  /></div>
              <div className="grid-100 pad-bottom"><button className="button" type="submit" >Sign Up</button><button className="button button-secondary" onClick={redirect}>Cancel</button></div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Already have a user account? <a href="/signin">Click here</a> to sign in!</p>
        </div>
      </div>


    );


}


export default UserSignUp;