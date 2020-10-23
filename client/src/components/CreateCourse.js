import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';


function CreateCourse (props) {

    const history = useHistory();

    const [formInput, setFormInput] = useState({});
    const [errors, setErrors] = useState([]);

    // set the formInput when changed
    const handleChange = (event) =>{
      setFormInput({...formInput, [event.target.name]: event.target.value} );
      
      
    }; 

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Send a POST request
        const response = await fetch('http://localhost:5000/api/courses',
            {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8', 
                'Authorization': `Basic ${props.authToken}`     
            },
            body: JSON.stringify(formInput)
    
            }    
        );
    
        if(response.status === 201) {
        
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
    };

    // handle the redirect when the cancel button is clicked
    const redirect = () =>{ history.push('/')};
    
    
    return(

          
        <div className="bounds course--detail">
            <h1>Create Course</h1>
            <div>
            <ErrorsDisplay errors={errors} />
            <form onSubmit = {handleSubmit}>
                <div className="grid-66">
                <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." onChange = {handleChange}/></div>
                    <p>By Joe Smith</p>
                </div>
                <div className="course--description">
                    <div><textarea id="description" name="description"  placeholder="Course description..." defaultValue={""} onChange = {handleChange} /></div>
                </div>
                </div>
                <div className="grid-25 grid-right">
                <div className="course--stats">
                    <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" onChange = {handleChange} /></div>
                    </li>
                    <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div><textarea id="materialsNeeded" name="materialsNeeded" placeholder="List materials..." defaultValue={""}  onChange = {handleChange}/></div>
                    </li>
                    </ul>
                </div>
                </div>
                <div className="grid-100 pad-bottom"><button className="button" type="submit">Create Course</button><button className="button button-secondary" onClick = {redirect} >Cancel</button></div>
            </form>
            </div>
        </div>
              
            
      

    );
}

export default CreateCourse;