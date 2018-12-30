import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  deleteCollectionItem,
  clearErrors,
  clearMessages
} from '../../actions/collectionActions';
class CollectionItem extends Component {
  componentWillUnmount() {
    this.props.clearErrors();
  }
  deleteFn = () => {
    const id = this.props.element._id;
    this.props.deleteCollectionItem(id);
    setTimeout(() => {
      this.props.clearMessages();
    }, 2000);
  };
  render() {
    const { amount, details, date } = this.props.element;
    const id = this.props.element._id;
    return (
      <tr key={id}>
        <td>{amount} </td>
        <td>{details}</td>
        <td>{date}</td>
        {this.props.auth.user === 'admin' ? (
          <td className="delete_item_button">
            <i
              onClick={this.deleteFn}
              className="material-icons del_icon red-text"
            >
              delete_forever
            </i>
          </td>
        ) : null}
      </tr>
    );
  }
}
const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
  collection: state.collection,
  messages: state.messages
});
CollectionItem.propTypes = {
  auth: PropTypes.object.isRequired,
  collection: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired,
  deleteCollectionItem: PropTypes.func.isRequired,
  clearMessages: PropTypes.func.isRequired
};
export default connect(
  mapStateToProps,
  {
    deleteCollectionItem,
    clearErrors,
    clearMessages
  }
)(CollectionItem);
