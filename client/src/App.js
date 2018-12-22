import React, { Component } from 'react';
//components
import Landing from './components/Landing';
import Login from './components/Login';
import Main from './components/Main';
import Create from './components/Create';
//
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import store from './store';
import './App.css';
import { Provider } from 'react-redux';
import setAxiosHeader from './utils/setAxiosHeader';
import { setCurrentUser } from './actions/authActions';
import jwt_decode from 'jwt-decode';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAxiosHeader(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Landing} />
            <Route exact path="/create" component={Create} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/collections" component={Main} />
            {/* <Route exact path="/collections" component={Main} /> */}
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
