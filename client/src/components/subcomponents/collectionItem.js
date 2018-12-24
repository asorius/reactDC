import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteCollectionItem } from '../../actions/collectionActions';
class collectionItem extends Component {
  render() {
    return (
      <div>
        <h1>item</h1>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
  collection: state.collection
});
collectionItem.propTypes = {
  auth: PropTypes.object.isRequired,
  collection: PropTypes.object.isRequired,
  deleteCollectionItem: PropTypes.func.isRequired
};
export default connect(
  mapStateToProps,
  {
    deleteCollectionItem
  }
)(collectionItem);
