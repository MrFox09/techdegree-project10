import React from 'react';
import './index.css';


//Import Components
import Courses from './components/Courses';
import Header from './components/Header';
import CourseDetail from './components/CourseDetail'; 




function App() {
  return (
    <div className="root">
      <div>
        <Header />
        <CourseDetail />
      </div> 
    </div>
  );
}

export default App;
