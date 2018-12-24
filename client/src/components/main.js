import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MainAdmin from './subcomponents/MainAdmin';
import MainUser from './subcomponents/MainUser';
import { getCollection } from '../actions/collectionActions';
import Preloader from '../utils/Preloader';
class Main extends Component {
  componentDidMount() {
    this.props.getCollection();
  }

  render() {
    const { user } = this.props.auth;
    const auth = this.props.auth.isAuthenticated;
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
  getCollection: PropTypes.func.isRequired
};
export default connect(
  mapStateToProps,
  { getCollection }
)(Main);
