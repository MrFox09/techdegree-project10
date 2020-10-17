import React, {useState} from 'react';
import axios from 'axios';

function CreateCourse () {

    const [formInput, setFormInput] = useState({});

    // set the formInput when changed
    const handleChange = (event) =>{
      setFormInput({...formInput, [event.target.name]: event.target.value} );
      console.log(formInput);
      
    }; 

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Send a POST request
        axios({
          method: 'post',
          url: 'http://localhost:5000/api/courses',      
          headers: {'Content-Type':'application/json'},
          data: formInput
        })
    
        
      };
    
    
    return(

          
        <div className="bounds course--detail">
            <h1>Create Course</h1>
            <div>
            <div>
                <h2 className="validation--errors--label">Validation errors</h2>
                <div className="validation-errors">
                <ul>
                    <li>Please provide a value for "Title"</li>
                    <li>Please provide a value for "Description"</li>
                </ul>
                </div>
            </div>
            <form onSubmit = {handleSubmit}>
                <div className="grid-66">
                <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." onChange = {handleChange}/></div>
                    <p>By Joe Smith</p>
                </div>
                <div className="course--description">
                    <div><textarea id="description" name="description" className placeholder="Course description..." defaultValue={""} onChange = {handleChange} /></div>
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
                        <div><textarea id="materialsNeeded" name="materialsNeeded" className placeholder="List materials..." defaultValue={""}  onChange = {handleChange}/></div>
                    </li>
                    </ul>
                </div>
                </div>
                <div className="grid-100 pad-bottom"><button className="button" type="submit">Create Course</button><button className="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button></div>
            </form>
            </div>
        </div>
              
            
      

    );
}

export default CreateCourse;