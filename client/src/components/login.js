import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser, clearErrors } from '../actions/authActions';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

class Login extends Component {
  state = {
    name: '',
    password: ''
  };
  //Skecthy fix for redirecting. Too frustrated to solve atm.
  componentWillMount() {
    if (localStorage.getItem('jwtToken'))
      this.props.history.push('/collections');
  }
  componentWillUnmount() {
    this.props.clearErrors();
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value.toLowerCase() });
  };
  onSubmit = e => {
    e.preventDefault();
    const dataToSend = {
      name: this.state.name,
      password: this.state.password,
      history: this.props.history
    };
    this.props.loginUser(dataToSend);
  };
  render() {
    const { errors } = this.props;

    return (
      <div className="container ">
        <div className="row center">
          <h1>Log into Collection</h1>
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

                  {errors ? (
                    <span className="helper-text red-text">{errors.name}</span>
                  ) : null}
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
                  {errors ? (
                    <span className="helper-text red-text">
                      {errors.password}
                    </span>
                  ) : null}
                </div>
              </div>

              <button
                className="btn waves-effect waves-light"
                type="submit"
                name="action"
              >
                Login
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
  auth: state.auth,
  errors: state.errors
});
Login.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};
export default connect(
  mapStateToProps,
  { loginUser, clearErrors }
)(Login);
