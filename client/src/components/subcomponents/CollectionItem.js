import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  deleteCollectionItem,
  clearErrors
} from '../../actions/collectionActions';
class CollectionItem extends Component {
  componentWillUnmount() {
    this.props.clearErrors();
  }
  deleteFn = () => {
    const id = this.props.element._id;
    this.props.deleteCollectionItem(id);
  };
  render() {
    const { amount, details } = this.props.element;
    const id = this.props.element._id;
    return (
      <tr key={id}>
        <td>{amount}</td>
        <td>{details}</td>
        <td>
          <i
            onClick={this.deleteFn}
            className="material-icons del_icon red-text"
          >
            delete_forever
          </i>
        </td>
      </tr>
    );
  }
}
const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
  collection: state.collection
});
CollectionItem.propTypes = {
  auth: PropTypes.object.isRequired,
  collection: PropTypes.object.isRequired,
  deleteCollectionItem: PropTypes.func.isRequired
};
export default connect(
  mapStateToProps,
  {
    deleteCollectionItem,
    clearErrors
  }
)(CollectionItem);
