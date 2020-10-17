import React, {useState} from 'react';
import axios from 'axios';

function UserSignIn () {

    const [formInput, setFormInput] = useState({emailAddress: '', password:''});

    // set the formInput when changed
    const handleChange = (event) =>{
      setFormInput({...formInput, [event.target.name]: event.target.value} );
     
    }; 

    const handleSubmit = (e) =>{
        e.preventDefault();

        const authorizationToken = btoa(`${formInput.emailAddress}:${formInput.password}`);

        axios({
            method:'get',
            url:'http://localhost:5000/api/users', 
            headers: {'Content-Type':'application/json', 'Authorization': `Basic ${authorizationToken}`},  
            
                      
        })
        .then(res=> console.log(res))


    };



    return(

        <div className="bounds">
            <div className="grid-33 centered signin">
            <h1>Sign In</h1>
            <div>
                <form onSubmit = {handleSubmit}>
                <div><input id="emailAddress" name="emailAddress" type="text" className='' placeholder="Email Address" onChange = {handleChange}  /></div>
                <div><input id="password" name="password" type="password" className='' placeholder="Password" onChange = {handleChange} /></div>
                <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign In</button><button className="button button-secondary"  >Cancel</button></div>
                </form>
            </div>
            <p>&nbsp;</p>
            <p>Don't have a user account? <a href="sign-up.html">Click here</a> to sign up!</p>
            </div>
        </div>
      

    );
}


export default UserSignIn;