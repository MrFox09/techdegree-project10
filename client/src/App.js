import React,{useState,useEffect} from 'react';
import './index.css';
import {
  BrowserRouter ,
  Route,
  Switch,
  Redirect,
  useHistory  
} from 'react-router-dom';

import Cookies from 'js-cookie';


//Import Components
import Courses from './components/Courses';
import Header from './components/Header';
import CourseDetail from './components/CourseDetail'; 
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignOut from './components/UserSignOut';
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';





function App() { 
  
  const history = useHistory();
  const [authenticatedUser, setAuthenticatedUser] = useState(Cookies.getJSON('authenticatedUser') || {});
  const [authenticated, setAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(''); 

    //calls the signIn function to sign the user when a cookie is available

    useEffect(()=>{
     signIn(authenticatedUser.emailAddress, authenticatedUser.password);       
      
    },[])
  

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

          setAuthenticatedUser(data,data.password=password);
          // set Cookie
          Cookies.set('authenticatedUser' , JSON.stringify(data),{expires:1});


        });
      
       setAuthenticated(true);
       setAuthToken(authorizationToken); 


     }
     else if( response.status === 401){
      setAuthenticated(false);
      setAuthenticatedUser({});
      setAuthToken('');
       return null;
     }
     else {
       history.push('/error');
     }     

  };

  // signs out the user and set the states to default values, removes cookies

  const signOut = () =>{
    setAuthenticatedUser({});
    setAuthenticated(false);
    setAuthToken('');
    Cookies.remove('authenticatedUser');

  };



  
 // HOC to protect routes
  const PrivateRoute = ({component: Component,  ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            authenticated ?
                <Component {...props} {...rest} />
            : <Redirect to="/signin" />
        )} />
    );
  };


  return (
    <BrowserRouter>

      <div className="root">
        <div>
          <Header authenticated={authenticated} authenticatedUser={authenticatedUser}  />

          <Switch>
            <Route exact path= "/" component={Courses} />
            <PrivateRoute  path= "/courses/create"   component={CreateCourse} authToken={authToken}/>
            <PrivateRoute  path= "/courses/:id/update" component={UpdateCourse} authToken={authToken}  />
            <Route  path= "/courses/:id" render={(routerProps)=> <CourseDetail {...routerProps} authenticated={authenticated} authenticatedUser={authenticatedUser} authToken={authToken}  />} />
            <Route  path= "/signin" render={()=> <UserSignIn  signIn= {signIn} /> }/>
            <Route  path= "/signup" render={()=> <UserSignUp  signIn= {signIn}  /> }/>
            <Route  path= "/signout" render={()=> <UserSignOut signOut= {signOut} /> }/>
            <Route  path= "/notfound" component={NotFound} />
            <Route  path= "/forbidden" component={Forbidden} />
            <Route  path= "/error" component={UnhandledError} />
            <Route  component={NotFound} />


          </Switch>
        
          
        </div> 
      </div>

    </BrowserRouter>
    

  );
}

export default App;
