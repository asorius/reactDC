import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCollection } from '../actions/collectionActions';
import PropTypes from 'prop-types';
import { clearErrors } from '../actions/authActions';
class Create extends Component {
  state = {
    name: '',
    password: '',
    password_admin: ''
  };
  componentWillUnmount() {
    this.props.clearErrors();
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const dataToSend = {
      name: this.state.name.toLowerCase(),
      password: this.state.password.toLowerCase(),
      password_admin: this.state.password_admin.toLowerCase(),
      history: this.props.history
    };
    this.props.createCollection(dataToSend);
  };
  render() {
    const { errors } = this.props;
    return (
      <div className="container">
        <h1>create</h1>
        <div className="row">
          <form className="col s12" onSubmit={this.onSubmit}>
            <div className="row">
              <div className="input-field col s6">
                <input
                  id="input_text"
                  type="text"
                  data-length="10"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  autoComplete="off"
                />
                <label htmlFor="input_text">Name of collection</label>

                {errors ? (
                  <span className="helper-text red-text">{errors.name}</span>
                ) : null}
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="validate"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                <label htmlFor="password">Password</label>
                {errors ? (
                  <span className="helper-text red-text">
                    {errors.password}
                  </span>
                ) : null}
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="password_admin"
                  type="password"
                  name="password_admin"
                  value={this.state.password_admin}
                  onChange={this.onChange}
                  className="validate"
                />
                <label htmlFor="password_admin">Admin password</label>
                {errors ? (
                  <span className="helper-text red-text">
                    {errors.password_admin}
                  </span>
                ) : null}
              </div>
            </div>
            <button
              className="btn waves-effect waves-light"
              type="submit"
              name="action"
            >
              Create
              <i className="material-icons right">send</i>
            </button>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});
Create.propTypes = {
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  createCollection: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};
export default connect(
  mapStateToProps,
  { createCollection, clearErrors }
)(Create);
