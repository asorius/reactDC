import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Landing extends Component {
  render() {
    return (
      <div className="container">
        <div className="row center">
          <h1>Debt Collector</h1>
        </div>
        <div className="row center">
          <div className="col s10 m6 landing_actions">
            <div className="row ">
              <div className="col s12 center">
                <Link
                  to="/create"
                  className="waves-effect waves-light btn"
                  onClick={this.onClick}
                >
                  Create New
                </Link>
              </div>
            </div>
            <div className="row">
              <div className="col s12 center">
                <Link
                  to="/login"
                  className="waves-effect waves-light btn"
                  onClick={this.onClick}
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
