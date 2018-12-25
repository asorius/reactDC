import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCollection } from '../actions/collectionActions';
import PropTypes from 'prop-types';
import { clearErrors } from '../actions/authActions';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
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
      <div className="container ">
        <div className="row center">
          <h1>Create new Collection</h1>
        </div>

        <div className="row action_form center">
          <div className="col s12 m8 offset-m2 center">
            <form onSubmit={this.onSubmit}>
              <div className="row">
                <div className="input-field col s12 m10 offset-m1">
                  <input
                    id="input_text"
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    maxLength="10"
                    minLength="1"
                    className={classnames({
                      invalid: errors.name
                    })}
                    autoComplete="off"
                  />
                  <label htmlFor="input_text">Name of collection</label>

                  <span
                    className={classnames('helper-text', {
                      'red-text': errors.name
                    })}
                  >
                    {errors.name ? errors.name : '1 - 10 characters'}
                  </span>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12 m10 offset-m1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    maxLength="15"
                    minLength="5"
                    className={classnames({
                      invalid: errors.password
                    })}
                  />
                  <label htmlFor="password">Password</label>
                  <span
                    className={classnames('helper-text', {
                      'red-text': errors.password
                    })}
                  >
                    {errors.password ? errors.password : '5 - 15 characters'}
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12 m10 offset-m1">
                  <input
                    id="password_admin"
                    type="password"
                    name="password_admin"
                    value={this.state.password_admin}
                    onChange={this.onChange}
                    minLength="5"
                    maxLength="15"
                    className={classnames({
                      invalid: errors.password_admin
                    })}
                  />
                  <label htmlFor="password_admin">Admin password</label>
                  <span
                    className={classnames('helper-text', {
                      'red-text': errors.password_admin
                    })}
                  >
                    {errors.password_admin
                      ? errors.password_admin
                      : '5 - 15 characters'}
                  </span>
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
        <div className="row">
          <div className="col right">
            <Link className="btn btn-small waves-effect waves-light" to="/">
              Back
              <i className="material-icons left">call_received</i>
            </Link>
          </div>
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
