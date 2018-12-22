import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Main extends Component {
  render() {
    return (
      <div>
        <h1>mian</h1>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});
Main.propTypes = {
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
export default connect(mapStateToProps)(Main);
