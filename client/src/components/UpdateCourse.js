import React, {useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';



function UpdateCourse ({match,...props}) {

    const history = useHistory();

    const [courseDetails, setCourseDetails] = useState([]);
    const [formInput, setFormInput] = useState({});
    const [errors, setErrors] = useState([]);

    const {authToken} = props;


    let id = match.params.id;
   
    // make a api call to get the course data
    useEffect(()=>{
        
      axios.get(`http://localhost:5000/api/courses/${id}`)
      .then( response => setCourseDetails(response.data))
      .catch(error => {
        if(error.response.status === 404){
          history.push('/notfound');
          
          
        }else{
          history.push('/error');
          console.log('Error with data fetching' , error);

        }
      });
    },[id]);

    // store the owner data in a variable, to have access to the owner object
    const ownerData = {...courseDetails.owner};   


    // on submit, updates the course 
    const handleSubmit = async (e) =>{
        e.preventDefault();      

        const response = await fetch(`http://localhost:5000/api/courses/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json; charset=utf-8', 
            'Authorization': `Basic ${authToken}`     
          },
          body: JSON.stringify(formInput)
  
        }    
      );
  
      if(response.status === 204) {
      
        history.push(`/courses/${id}`);
  
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

    // set the formInput when changed
    const handleChange = (event) =>{
    setFormInput({...formInput, [event.target.name]: event.target.value} );

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
    const redirect = () =>{ history.push(`/courses/${id}`)};


    return(
        <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
        <ErrorsDisplay errors={errors} />
          <form onSubmit={handleSubmit}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." defaultValue={courseDetails.title} onChange={handleChange}/></div>
                <p>{`by ${ownerData.firstName} ${ownerData.lastName}`}</p>
              </div>
              <div className="course--description">
                <div><textarea id="description" name="description"  placeholder="Course description..." defaultValue={courseDetails.description} onChange={handleChange}/></div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" defaultValue={courseDetails.estimatedTime} onChange={handleChange} /></div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div><textarea id="materialsNeeded" name="materialsNeeded"  placeholder="List materials..." defaultValue={courseDetails.materialsNeeded} onChange={handleChange} /></div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom"><button className="button" type="submit">Update Course</button><button className="button button-secondary" onClick={redirect} >Cancel</button></div>
          </form>
        </div>
      </div>
    );
}

export default UpdateCourse;