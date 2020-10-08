import React, {useState,useEffect} from 'react';
import axios from 'axios';


function CourseDetail (props) {


    const [courseDetails, setCourseDetails] = useState([]);


    const handleCourseDetailSearch = (id) => {

        axios.get(`http://localhost:5000/api/courses/${id}`)
        .then( response => setCourseDetails(response.data))
        .catch(error => {
            console.log('Error with data fetching' , error);
        });


    };

    useEffect(()=>{

    axios.get(`http://localhost:5000/api/courses/${1}`)
    .then( response => setCourseDetails(response.data))
    .catch(error => {
        console.log('Error with data fetching' , error);
    });

},[]);




    // create the materials needed list 

    // if(courseDetails.materialsNeeded) {

    //     const materialsNeeded = courseDetails.materialsNeeded;
    //     const materialsNeededArray = materialsNeeded.splice('\n');

    // }

   

   


    return(
        <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100"><span><a className="button" href="update-course.html">Update Course</a><a className="button" href="#">Delete Course</a></span><a
                className="button button-secondary" href="index.html">Return to List</a></div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{courseDetails.title}</h3>
              <p>{`by ${courseDetails.owner} ${courseDetails.owner}`}</p>
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
                    {                       
                        /* {materialsNeededArray.map((value, index) => {
                         return <li key={index}>{value}</li>
                    })} */}
                    
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