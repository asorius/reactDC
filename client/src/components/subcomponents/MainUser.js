import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CollectionItem from './CollectionItem';
import { logoutUser } from '../../actions/collectionActions';
import { setUser } from '../../actions/authActions';
class MainUser extends Component {
  state = {
    reload: this.props.reload
  };
  onLogout = e => {
    e.preventDefault();
    this.props.logoutUser();
    this.props.setUser({});
  };
  render() {
    const { name, sum, data } = this.props.collection.collection;
    let list = data.map(element => (
      <CollectionItem element={element} key={element._id} />
    ));
    return (
      <div className="row center">
        <div className="col s12">
          <h1>{name}</h1>
        </div>

        <div className="col s12  m8 offset-m2 xl6 offset-xl3 main_col user_table">
          <table className="highlight centered data_table">
            <thead className="grey darken-3 white-text">
              <tr>
                <th>Amount</th>
                <th>Details</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody className="relate">{list}</tbody>
          </table>
          <div className="row black-text">
            {' '}
            <h5> In Total: {sum} &#xa3;</h5>
          </div>
        </div>
        <div className="col s12 logout">
          <button
            onClick={this.onLogout}
            className="waves-effect deep-orange darken-4 btn"
          >
            <i className="material-icons left  teal-text">directions_run</i>Log
            Out
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  collection: state.collection
});
MainUser.propTypes = {
  collection: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired
};
export default connect(
  mapStateToProps,
  { logoutUser, setUser }
)(MainUser);
