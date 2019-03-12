import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MainAdmin from './subcomponents/MainAdmin';
import MainUser from './subcomponents/MainUser';
import { getCollection, clearErrors } from '../actions/collectionActions';
import Preloader from '../utils/Preloader';
import io from 'socket.io-client';

import { setUser } from '../actions/authActions';
import { logoutUser } from '../actions/collectionActions';

const socket = io.connect();
class Main extends Component {
  constructor(props) {
    super(props);
    socket.on('updateForUsers', () => {
      window.location.reload();
    });
  }

  componentDidMount() {
    this.props.getCollection();
  }

  componentDidUpdate(prevProps) {
    if (this.props.collection.collection) {
      socket.emit('joinRoom', { room: this.props.collection.collection.name });
      const newData = this.props.collection.collection;
      const oldData = prevProps.collection.collection;
      if (oldData !== newData && oldData !== undefined) {
        socket.emit('update', { room: this.props.collection.collection.name });
      }
    } else if (
      //bugfix if collection isnt existing on db yet there is still token stored in localstorage
      this.props.collection.loading === false &&
      this.props.collection.collection === null
    ) {
      this.props.logoutUser();
      this.props.setUser({});
    }
  }
  componentWillUnmount() {
    //in case of token/no db there wont be no name, so check before if there is an actual collection reduxed
    if (this.props.collection.collection !== null) {
      socket.emit('leaveRoom', { room: this.props.collection.collection.name });
    }
  }

  render() {
    const { user } = this.props.auth;
    const { collection, loading } = this.props.collection;
    let content;
    if (collection === null || loading) {
      content = <Preloader />;
    } else {
      content =
        user === 'admin' ? (
          <MainAdmin />
        ) : user === 'user' ? (
          <MainUser />
        ) : (
          <h1>Error</h1>
        );
    }
    return <div className="container center">{content}</div>;
  }
}
const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
  collection: state.collection
});
Main.propTypes = {
  auth: PropTypes.object.isRequired,
  collection: PropTypes.object.isRequired,
  getCollection: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};
export default connect(
  mapStateToProps,
  { getCollection, clearErrors, logoutUser, setUser }
)(Main);
