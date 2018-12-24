import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
class MainUser extends Component {
  render() {
    return (
      <div>
        <h1>user</h1>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  collection: state.collection
});
MainUser.propTypes = {
  collection: PropTypes.object.isRequired
};
export default connect(mapStateToProps)(MainUser);
