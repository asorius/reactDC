import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CollectionItem from './CollectionItem';
import {
  addToCollection,
  deleteCollectionItems,
  deleteCollection,
  logoutUser,
  clearErrors
} from '../../actions/collectionActions';
import { setUser } from '../../actions/authActions';
class MainAdmin extends Component {
  state = {
    amount: '',
    details: ''
  };
  componentWillUnmount() {
    this.props.clearErrors();
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const data = this.state;
    this.props.addToCollection(data);
    this.setState({
      amount: '',
      details: ''
    });
  };
  onLogout = e => {
    e.preventDefault();
    this.props.logoutUser();
    this.props.setUser({});
  };

  onDeleteItems = () => {
    this.props.deleteCollectionItems();
  };
  onDeleteAll = () => {
    this.props.setUser({});
    this.props.deleteCollection();
    this.props.logoutUser();
  };
  render() {
    const { errors } = this.props;
    const { name, sum, data } = this.props.collection.collection;
    let list = data.map(element => (
      <CollectionItem element={element} key={element._id} />
    ));
    return (
      <div className="row center">
        <div className="col s12">
          <h1>{name}</h1>
        </div>
        <form
          className="col s12 m8 offset-m2 add_container"
          onSubmit={this.onSubmit}
        >
          <div className="row center">
            <div className="input-field col s12 m6 ">
              <input
                id="amount"
                type="text"
                value={this.state.amount}
                onChange={this.onChange}
                name="amount"
                autoComplete="off"
                className="white-text"
              />
              <label htmlFor="amount">Amount</label>
              {errors ? (
                <span className="helper-text red-text">{errors.amount}</span>
              ) : null}
            </div>
            <div className="input-field col s12 m6 ">
              <input
                id="details"
                type="text"
                value={this.state.details}
                onChange={this.onChange}
                name="details"
                autoComplete="off"
                className="white-text"
              />
              <label htmlFor="details">Details</label>
              {errors ? (
                <span className="helper-text red-text">{errors.details}</span>
              ) : null}
            </div>
            <button type="submit" className="waves-effect waves-light btn">
              <i className="material-icons left">done</i>Add
            </button>
          </div>
        </form>
        <div className="col s12 m8 offset-m2 user_data_container center">
          <table className="striped user_data_table">
            <thead>
              <tr>
                <th>Amount</th>
                <th>Details</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody className="scrolled">{list}</tbody>
          </table>
          <div className="row">
            <h5> In Total: {sum} &#xa3;</h5>
          </div>
        </div>
        <div className="row center">
          <div className="col s12 m3 offset-m3 logout ">
            <button
              onClick={this.onDeleteItems}
              className="waves-effect waves-light btn"
            >
              Delete Data
            </button>
          </div>
          <div className="col s12 m3 logout">
            <button
              onClick={this.onDeleteAll}
              className="waves-effect waves-light btn"
            >
              Del Account
            </button>
          </div>
        </div>
        <button
          onClick={this.onLogout}
          className="waves-effect waves-light btn"
        >
          <i className="material-icons left">directions_run</i>Log Out
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
    setUser,
    clearErrors
  }
)(MainAdmin);
