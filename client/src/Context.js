import React, { Component } from 'react';
import Cookies from 'js-cookie';

const Context = React.createContext(); 

export class Provider extends Component {

  state= {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null
  };

  constructor() {
    super();
    
  }



  render() {
    const { authenticatedUser } = this.state;


    const value = {
      authenticatedUser,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut
      }
    };

    return (
      <Context.Provider value= {value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  
  signIn = async (userName, password) => {

    const authorizationToken = btoa(`${userName}:${password}`);

    const user = await fetch('http://localhost:5000/api/users',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Basic ${authorizationToken}`
      }

    });
    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user,
        };
      });

      // set cookies
      Cookies.set('authenticatedUser', JSON.stringify(user),{expires:1});

  

    }

    return user;

  }

  signOut = () => {
    this.setState(() => {
      return {
        authenticatedUser: null,
      };
    });
    Cookies.remove('authenticatedUser');
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

