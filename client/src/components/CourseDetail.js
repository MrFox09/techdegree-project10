import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { Link,useHistory } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'


function CourseDetail ({match,...props}) {

    const history = useHistory();

    const {authenticated,authenticatedUser,authToken} = props;
   

    const [courseDetails, setCourseDetails] = useState([]);

    


    let id = match.params.id;
   

    useEffect(()=>{
      axios.get(`http://localhost:5000/api/courses/${id}`)
      .then( response => setCourseDetails(response.data))
      .catch(error => {
          history.push('/notfound');
          console.log('Error with data fetching' , error);
      });
    },[id]);

    // store the owner data in a variable, to have access to the owner object
    const ownerData = {...courseDetails.owner};   

    const handleDelete = async () => {

      const response = await fetch(`http://localhost:5000/api/courses/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `Basic ${authToken}`
        }

      }    
    );
     if (response.status === 204){

      history.push('/');     

     }
     else if( response.status === 401){
       history.push('/forbidden');

     }
     else {
       throw new Error();
     }

    };

   


    return(

      
        <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
            {/** when userId and course id match and the user is logged in the delete and the update button will render */}
            {
               authenticatedUser.id === ownerData.id && authenticated ?
               <span>
                <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                <Link className="button" href="#" onClick={handleDelete}>Delete Course</Link>
              </span>
              :null

            }
              

              <Link className="button button-secondary" to="/">Return to List</Link>
            </div>
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
              <ReactMarkdown>{courseDetails.description}</ReactMarkdown>

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
                  
                   <ReactMarkdown>{courseDetails.materialsNeeded}</ReactMarkdown>                   
                
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
}


export default CourseDetail;