import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CollectionItem from './CollectionItem';
import { logoutUser } from '../../actions/collectionActions';
import { setUser } from '../../actions/authActions';
class MainUser extends Component {
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
      <div>
        <h1>{name}</h1>

        <div className="row user_data_container center">
          <table className="striped user_data_table">
            <thead>
              <tr>
                <th>Amount</th>
                <th>Details</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>{list}</tbody>
          </table>
          <div className="row">
            {' '}
            <h5> In Total: {sum} &#xa3;</h5>
          </div>
        </div>

        <button
          onClick={this.onLogout}
          className="waves-effect waves-light btn"
        >
          <i className="material-icons left">directions_run</i>Log Out
        </button>
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
