import React, { Component } from 'react';

export default class Login extends Component {
  // // Check for token
  // if (localStorage.jwtToken) {
  //   // Set auth token header auth
  //   setAuthToken(localStorage.jwtToken);
  //   // Decode token and get user info and exp
  //   const decoded = jwt_decode(localStorage.jwtToken);
  //   // Set user and isAuthenticated
  //   store.dispatch(setCurrentUser(decoded));

  //   // Check for expired token
  //   const currentTime = Date.now() / 1000;
  //   if (decoded.exp < currentTime) {
  //     // Logout user
  //     store.dispatch(logoutUser());
  //     // Clear current Profile
  //     store.dispatch(clearCurrentProfile());
  //     // Redirect to login
  //     window.location.href = '/login';
  //   }
  // }
  render() {
    return (
      <div className="container">
        <h1>Login</h1>
      </div>
    );
  }
}
