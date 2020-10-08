import React, {useState,useEffect} from 'react';
import axios from 'axios';
import Course from './Course';

//Fetch all courses data from the api and render the courses  

function Courses () {

    const [courses, setCourses] = useState([]); 

    useEffect(()=>{

        axios.get('http://localhost:5000/api/courses')
            .then( response => setCourses(response.data))
            .catch(error => {
                console.log('Error with data fetching' , error);
            });
            
    },[]);

    let course;

    if(courses.length > 0) {

        course = courses.map(courses => <Course key={courses.id} title={courses.title} description={courses.description} /> )

    }

 





    return(
      
        <div className="bounds">

        {course}
    
        <div className="grid-33"><a className="course--module course--add--module" href="create-course.html">
            <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 13 13" className="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>New Course</h3>
          </a></div>
      </div>

    );


}



export default Courses;