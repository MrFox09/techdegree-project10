import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';


function UserSignIn (props) {

    const history = useHistory();   

    const [formInput, setFormInput] = useState({emailAddress: '', password:''});

    // set the formInput when changed
    const handleChange = (event) =>{
      setFormInput({...formInput, [event.target.name]: event.target.value} );
     
    }; 

    // on submit calls the sign in function in App.js and sign in the user
    const handleSubmit = async (e) =>{
        e.preventDefault();

        const user = await props.signIn(formInput.emailAddress,formInput.password);       
            
        if(user === null) {            
            history.push('/forbidden');
        }else{
            
            console.log(`User: ${formInput.emailAddress} logged in`)
            history.goBack();
            
        }
      

    };

    // on cancel click redirects to root route

    const handleCancel = (e) =>{
        e.preventDefault();
        history.push('/');
    };



    return(

        <div className="bounds">
            <div className="grid-33 centered signin">
            <h1>Sign In</h1>
            <div>
                <form onSubmit = {handleSubmit}>
                <div><input id="emailAddress" name="emailAddress" type="text" className='' placeholder="Email Address" onChange = {handleChange}  /></div>
                <div><input id="password" name="password" type="password" className='' placeholder="Password" onChange = {handleChange} /></div>
                <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign In</button><button className="button button-secondary" onClick={ handleCancel}  >Cancel</button></div>
                </form>
            </div>
            <p>&nbsp;</p>
            <p>Don't have a user account? <a href="/signup">Click here</a> to sign up!</p>
            </div>
        </div>
      

    );
}


export default UserSignIn;