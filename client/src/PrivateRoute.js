import React from 'react';
import { Route, Redirect } from 'react-router-dom';


export default ({ children, ...rest }) => {
  return (
    
      
        <Route
          {...rest}
          render={({location},props)=> props.isAuthenticated ? (
              children
            ) : (
              <Redirect to={{
                pathname: '/signin',
                state: { from: location },
              }} />
            )
          }
        />
     
    
  );
};