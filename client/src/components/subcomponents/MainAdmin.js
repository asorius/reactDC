import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CollectionItem from './CollectionItem';
import Preloader from '../../utils/Preloader';
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
    const { collection } = this.props;
    let list = data.map(element => (
      <CollectionItem element={element} key={element._id} />
    ));
    return (
      <div>
        <h1>{name}</h1>
        <form className="col s12" onSubmit={this.onSubmit}>
          <div className="row center">
            <div className="input-field col s12 m6">
              <input
                id="amount"
                type="text"
                value={this.state.amount}
                onChange={this.onChange}
                name="amount"
                autoComplete="off"
              />
              <label htmlFor="amount">Amount</label>
              {errors ? (
                <span className="helper-text red-text">{errors.amount}</span>
              ) : null}
            </div>
            <div className="input-field col s12 m6">
              <input
                id="details"
                type="text"
                value={this.state.details}
                onChange={this.onChange}
                name="details"
                autoComplete="off"
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
        <div className="row">
          <table className="striped">
            <thead>
              <tr>
                <th>Amount</th>
                <th>Details</th>
              </tr>
            </thead>

            <tbody>{list}</tbody>
          </table>
          <div className="row">In Total: {sum}</div>
        </div>
        <div className="row center">
          <div className="col s12 m3">
            <button
              onClick={this.onDeleteItems}
              className="waves-effect waves-light btn"
            >
              Delete List
            </button>
          </div>
          <div className="col s12 m3">
            <button
              onClick={this.onDeleteAll}
              className="waves-effect waves-light btn"
            >
              Delete Account
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
