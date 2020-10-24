import React from 'react';
import { Redirect } from 'react-router-dom';

// calls the signOut method in App.js and redirects to root route

export default (props) => {
  props.signOut();
  return (
    <Redirect to="/" />
  );
}
