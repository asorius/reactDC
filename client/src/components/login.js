import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser, clearErrors } from '../actions/authActions';
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
      <div className="container">
        <h1>login</h1>
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
              {errors ? (
                <span className="helper-text red-text">{errors.error}</span>
              ) : null}
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
