import React from 'react';
import { Link } from 'react-router-dom';

//returns a course component 

function Course (props) {        

    return(

        <div className="grid-33"><Link className="course--module course--link" to={`/courses/${props.id}`}> 
        <h4 className="course--label">{props.title}</h4>
        <h3 className="course--title">{props.description}</h3>
      </Link></div>

    );
}

export default Course;