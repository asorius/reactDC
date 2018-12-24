import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import collectionItem from './collectionItem';
import {
  addToCollection,
  deleteCollectionItems,
  deleteCollection,
  logoutUser
} from '../../actions/collectionActions';
import { setUser } from '../../actions/authActions';
class MainAdmin extends Component {
  onLogout = e => {
    e.preventDefault();
    this.props.logoutUser();
    this.props.setUser({});
  };

  render() {
    const { name, sum, data } = this.props.collection.collection;
    return (
      <div>
        <h1>{name}</h1>
        <div className="row">
          <ul className="collection">
            <li className="collection-item">
              <div>
                Alvin
                <a href="#!" className="secondary-content">
                  <i className="material-icons">send</i>
                </a>
              </div>
            </li>
            <li className="collection-item">
              <div>
                Alvin
                <a href="#!" className="secondary-content">
                  <i className="material-icons">send</i>
                </a>
              </div>
            </li>
            <li className="collection-item">
              <div>
                Alvin
                <a href="#!" className="secondary-content">
                  <i className="material-icons">send</i>
                </a>
              </div>
            </li>
            <li className="collection-item">
              <div>
                Alvin
                <a href="#!" className="secondary-content">
                  <i className="material-icons">send</i>
                </a>
              </div>
            </li>
          </ul>
        </div>
        <button
          onClick={this.onLogout}
          className="waves-effect waves-light btn"
        >
          <i className="material-icons left">cloud</i>Log Out
        </button>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
  collection: state.collection
});
MainAdmin.propTypes = {
  auth: PropTypes.object.isRequired,
  collection: PropTypes.object.isRequired,
  addToCollection: PropTypes.func.isRequired,
  deleteCollectionItems: PropTypes.func.isRequired,
  deleteCollection: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired
};
export default connect(
  mapStateToProps,
  {
    addToCollection,
    deleteCollection,
    deleteCollectionItems,
    logoutUser,
    setUser
  }
)(MainAdmin);
