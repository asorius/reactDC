import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  deleteCollectionItem,
  setEdition,
  clearErrors,
  clearMessages
} from '../../actions/collectionActions';
class CollectionItem extends Component {
  deleteFn = () => {
    const id = this.props.element._id;
    this.props.deleteCollectionItem(id);
    setTimeout(() => {
      this.props.clearMessages();
      this.props.clearErrors();
    }, 1000);
  };
  editFn = () => {
    const { amount, details, _id } = this.props.element;
    this.props.setEdition({ amount, details, _id, labels: true });
  };
  render() {
    const { amount, details, date } = this.props.element;
    const id = this.props.element._id;
    return (
      <tr className="item" key={id}>
        <td className="item_amount">{amount} </td>
        <td className="item_details">{details}</td>
        {this.props.auth.user === 'user' ? (
          <td className="item_date">{date}</td>
        ) : (
          <td className="item_date">{date}</td>
        )}

        {this.props.auth.user === 'admin' ? (
          <td className="delete_item ">
            <div className="del_cell_item">
              <i
                onClick={this.editFn}
                className="material-icons del_icon blue-text"
              >
                edit
              </i>
              <i
                onClick={this.deleteFn}
                className="material-icons del_icon red-text"
              >
                delete_forever
              </i>
            </div>
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
  setEdition: PropTypes.func.isRequired,
  clearMessages: PropTypes.func.isRequired
};
export default connect(
  mapStateToProps,
  {
    deleteCollectionItem,
    setEdition,
    clearErrors,
    clearMessages
  }
)(CollectionItem);
