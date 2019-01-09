import React from 'react';
export default function Spinner() {
  return (
    <div className="row">
      <div className="col s12 m8 offset-m2 ">
        <div className="row preloader center s12 m8 offset-m2 ">
          <div className="preloader-wrapper big active ">
            <div className="spinner-layer spinner-blue-only">
              <div className="circle-clipper left">
                <div className="circle" />
              </div>
              <div className="gap-patch">
                <div className="circle" />
              </div>
              <div className="circle-clipper right">
                <div className="circle" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
