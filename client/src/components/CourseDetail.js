import React, {useState,useEffect} from 'react';
import axios from 'axios';


function CourseDetail () {


    const [courseDetails, setCourseDetails] = useState([]);


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

    const handleDelete = () => {

      axios.delete(`http://localhost:5000/api/courses/${id}`, {
        data: {       
        }
      });

    };

   


    return(
        <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100"><span><a className="button" href={`/courses/${id}/update`}>Update Course</a><a className="button" href="#" onClick={handleDelete}>Delete Course</a></span><a
                className="button button-secondary" href="/">Return to List</a></div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{courseDetails.title}</h3>
              <p>{`by ${ownerData.firstName} ${ownerData.lastName}`}</p>
            </div>
            <div className="course--description">
              <p>{courseDetails.description}</p>

            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{courseDetails.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                   <li>{courseDetails.materialsNeeded}</li>                    
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
}


export default CourseDetail;