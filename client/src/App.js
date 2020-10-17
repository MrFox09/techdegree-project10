import React from 'react';
import './index.css';


//Import Components
import Courses from './components/Courses';
import Header from './components/Header';
import CourseDetail from './components/CourseDetail'; 
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';




function App() {
  return (
    <div className="root">
      <div>
        <Header />
        <CreateCourse/>
        
      </div> 
    </div>
  );
}

export default App;
