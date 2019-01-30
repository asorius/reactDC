import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MainAdmin from './subcomponents/MainAdmin';
import MainUser from './subcomponents/MainUser';
import { getCollection } from '../actions/collectionActions';
import Preloader from '../utils/Preloader';

import io from 'socket.io-client';
const socket = io.connect();

class Main extends Component {
  componentDidMount() {
    this.props.getCollection();
    socket.on('connected', msg => console.log(msg));
  }
  componentWillMount() {}
  componentDidUpdate(prevProps) {
    if (prevProps.collection.collection !== this.props.collection.collection) {
      // const newCollection = this.props.collection.collection;
      //emit to server socket
      // socket.emit('refreshCall', {
      //   data: newCollection,
      //   msg: 'from didupdate'
      // });
    }
  }

  render() {
    //emited by server socket
    socket.on('refreshList', data => {
      console.log(data.msg);
      this.props.collection.collection = { ...data.newdata };
    });
    const { user } = this.props.auth;
    const { collection, loading } = this.props.collection;
    let content;
    if (collection === null || loading) {
      content = <Preloader />;
    } else {
      socket.emit('listRefresh', collection);
      // console.log(`from component ${JSON.stringify(collection, null, ' ')} `);

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
  getCollection: PropTypes.func.isRequired
};
export default connect(
  mapStateToProps,
  { getCollection }
)(Main);
