import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MainAdmin from './subcomponents/MainAdmin';
import MainUser from './subcomponents/MainUser';
import { getCollection, clearErrors } from '../actions/collectionActions';
import Preloader from '../utils/Preloader';
import io from 'socket.io-client';
const socket = io.connect();
class Main extends Component {
  state = {
    socket: 'initial'
  };

  componentDidMount() {
    this.props.getCollection();
    socket.on('updateForUsers', newData => {
      this.setState({ socket: 'updated' });
      this.props.clearErrors();
    });
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.collection.collection !== this.props.collection.collection &&
      prevProps.collection.collection !== undefined
    ) {
      const newData = this.props.collection.collection;
      socket.emit('update', newData);
      socket.on('updateForUser', () => {
        this.setState({ socket: 'updated' });
      });
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
    return (
      <div className="container center">
        <h1>{this.state.socket}</h1>
        {content}
      </div>
    );
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
  clearErrors: PropTypes.func.isRequired
};
export default connect(
  mapStateToProps,
  { getCollection, clearErrors }
)(Main);
