import React, {useState,useEffect} from 'react';
import { Link,useHistory } from 'react-router-dom';
import axios from 'axios';
import Course from './Course';



function Courses () {
    const history = useHistory();
    const [courses, setCourses] = useState([]); 

    //Fetch all courses data from the api and render the courses  
    useEffect(()=>{

        axios.get('http://localhost:5000/api/courses')
            .then( response => setCourses(response.data))
            .catch(error => {
                if(error.response.status === 404){
                    history.push('/notfound');
                    console.log('Error with data fetching' , error);
                    
                  }else{
                    history.push('/error');
        
                  }
            });
            
    },[]);

    let course;

    // creates the course components and store the data in course
    if(courses.length > 0) {

        course = courses.map(courses => <Course key={courses.id} title={courses.title} description={courses.description} id={courses.id} /> )

    }

    return(
      
        <div className="bounds">

        {course}
    
        <div className="grid-33"><Link className="course--module course--add--module" to="/courses/create">
            <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 13 13" className="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>New Course</h3>
          </Link></div>
      </div>

    );


}



export default Courses;