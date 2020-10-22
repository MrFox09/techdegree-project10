import React from 'react';
import { Redirect } from 'react-router-dom';

export default (props) => {
  props.signOut();
  return (
    <Redirect to="/" />
  );
}
