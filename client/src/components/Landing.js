import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/collections');
    }
  }
  render() {
    return (
      <div className="container">
        <div className="row center">
          <h1>Debt Collector</h1>
        </div>
        <div className="row center">
          <div className="col s12 m6 offset-m3 landing_actions">
            <div className="row ">
              <div className="col s6 offset-s3 ">
                <Link to="/create">
                  <button className="waves-effect waves-light btn  btn-landing grey darken-3">
                    <i className="teal-text  material-icons">
                      create_new_folder
                    </i>
                    <div className="land_btn_text">Create</div>
                  </button>
                </Link>
              </div>
            </div>
            <div className="row">
              <div className="col s6 offset-s3">
                <Link to="/login">
                  <button className="waves-effect waves-light btn btn-landing grey darken-3">
                    <i className="teal-text material-icons">folder_shared</i>
                    <div className="land_btn_text">Login</div>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});
Landing.propTypes = {
  auth: PropTypes.object.isRequired
};
export default connect(mapStateToProps)(Landing);
