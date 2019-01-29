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
import { setUser } from './actions/authActions';
import jwt_decode from 'jwt-decode';
//socket stuff
import io from 'socket.io-client';
var socket = io.connect('/collectionUsers');
socket.on('news', function(data) {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});
//set user from token to redux, before app render
if (localStorage.jwtToken) {
  setAxiosHeader(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setUser(decoded));
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
