import React from 'react';

//returns a course component 

function Course (props) {        

    return(

        <div className="grid-33"><a className="course--module course--link" href={`/courses/${props.id}`}> 
        <h4 className="course--label">{props.title}</h4>
        <h3 className="course--title">{props.description}</h3>
      </a></div>

    );
}

export default Course;