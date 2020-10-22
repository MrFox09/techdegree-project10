import React,{useState} from 'react';
import './index.css';
import {
  BrowserRouter ,
  Route,
  Switch,
  Redirect,
  
  
} from 'react-router-dom';


//Import Components
import Courses from './components/Courses';
import Header from './components/Header';
import CourseDetail from './components/CourseDetail'; 
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignOut from './components/UserSignOut';




function App() {
  

  const [authenticatedUser, setAuthenticatedUser] = useState({});
  const [authenticated, setAuthenticated] = useState({isAuthenticated:false});
  

  // signIn signs in a user 

  const signIn = async (userName, password) => {
    

    const authorizationToken = btoa(`${userName}:${password}`);

   
    const response = await fetch('http://localhost:5000/api/users',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `Basic ${authorizationToken}`
        }

      }    
    );
     if (response.status === 200){

      response.json()
        .then(data => {
          setAuthenticatedUser(data)
        });

      
       setAuthenticated(authenticated.isAuthenticated =true);
       
       
              

     }
     else if( response.status === 401){
      setAuthenticated(authenticated.isAuthenticated =false);
       return null;
     }
     else {
       throw new Error();
     }     

  };

  //signOut function which signsOut the user and redirect to "/"

  const signOut = () =>{
    setAuthenticatedUser({});
    setAuthenticated(authenticated.isAuthenticated =false);

  };



  function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({location}) =>
          authenticated.isAuthenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }


  return (
    <BrowserRouter>

      <div className="root">
        <div>
          <Header />

          <Switch>
            <Route exact path= "/" component={Courses} />
            <PrivateRoute  path= "/courses/create" component={CreateCourse} />
            <PrivateRoute  path= "/courses/:id/update" component={UpdateCourse} />
            <Route  path= "/courses/:id" render={(routerProps)=> <CourseDetail {...routerProps} authenticated={authenticated} authenticatedUser={authenticatedUser}  />} />
            <Route  path= "/signin" render={()=> <UserSignIn  signIn= {signIn} /> }/>
            <Route  path= "/signup" component={UserSignUp} />
            <Route  path= "/signout" render={()=> <UserSignOut signOut= {signOut} /> }/>


          </Switch>
        
          
        </div> 
      </div>

    </BrowserRouter>
    

  );
}

export default App;
