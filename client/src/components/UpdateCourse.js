import React, {useState,useEffect} from 'react';
import axios from 'axios';



function UpdateCourse () {

    const [courseDetails, setCourseDetails] = useState([]);
    const [formInput, setFormInput] = useState({});


    let id = 1; //match.params.id;
   

    useEffect(()=>{
      axios.get(`http://localhost:5000/api/courses/${id}`)
      .then( response => setCourseDetails(response.data))
      .catch(error => {
          console.log('Error with data fetching' , error);
      });
    },[id]);

    // store the owner data in a variable, to have access to the owner object
    const ownerData = {...courseDetails.owner};   

    const handleSubmit = (e) =>{
        e.preventDefault();

      

        axios({
            method:'post',
            url:`http://localhost:5000/api/courses/${id}`, 
            headers: {'Content-Type':'application/json', },  //authorization header is missing
            data: formInput
                      
        })
        .then(res=> console.log(res))


    };

    // set the formInput when changed
    const handleChange = (event) =>{
    setFormInput({...formInput, [event.target.name]: event.target.value} );

    }; 


    return(
        <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
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
            <div className="grid-100 pad-bottom"><button className="button" type="submit">Update Course</button><button className="button button-secondary" >Cancel</button></div>
          </form>
        </div>
      </div>
    );
}

export default UpdateCourse;