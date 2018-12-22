import React from 'react';

export default function Landing() {
  return (
    <div className="container">
      <div className="row center">
        <h1>Debt Collector</h1>
      </div>
      <div className="row landing_actions">
        <div className="row ">
          <div class="col s6 offset-s3">
            <button class="waves-effect waves-light btn">Create New</button>
          </div>
        </div>
        <div className="row">
          <div class="col s6 offset-s3">
            <button class="waves-effect waves-light btn">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}
