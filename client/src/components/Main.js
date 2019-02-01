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
  constructor(props) {
    super(props);
    socket.on('updateForUsers', newData => {
      window.location.reload();
      // this.updatePropsCollection(newData);
    });
  }
  state = {
    reload: false
  };

  updatePropsCollection = data => {
    // console.log('fn from updateprops ');
    this.props.collection.collection = data;
    // console.log(`setted ${JSON.stringify(data, null, ' ')} to props.`);
    this.setState({ reload: true });
  };

  componentDidMount() {
    this.props.getCollection();
  }

  componentWillUpdate(nextProps, nextState) {
    // console.log(`
    //   nextState : ${JSON.stringify(nextState, null, ' ')},
    //   nextProps: ${JSON.stringify(nextProps.collection.collection, null, ' ')}
    //   thisState:${JSON.stringify(this.state, null, ' ')}
    //   thisProps:${JSON.stringify(this.props.collection.collection, null, ' ')}
    //   comparare nextprops is equal to thisprops ${nextProps.collection
    //     .collection === this.props.collection.collection}    `);
    const preupdate = this.props.collection.collection;
    const incoming = nextProps.collection.collection;
    if (preupdate !== incoming && preupdate !== undefined) {
      // console.log('if statement ran..');
      socket.emit('update', incoming);
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
  clearErrors: PropTypes.func.isRequired
};
export default connect(
  mapStateToProps,
  { getCollection, clearErrors }
)(Main);
