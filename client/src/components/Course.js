import React from 'react';

//returns a course component 

function Course (props) {        

    return(

        <div className="grid-33"><a className="course--module course--link" href="course-detail.html"> {/** we have to change the link to the detail course route */}
        <h4 className="course--label">{props.title}</h4>
        <h3 className="course--title">{props.description}</h3>
      </a></div>

    );
}

export default Course;