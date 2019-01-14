import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CollectionItem from './CollectionItem';
import {
  addToCollection,
  deleteCollectionItems,
  deleteCollection,
  logoutUser,
  clearErrors,
  clearMessages
} from '../../actions/collectionActions';
import { setUser } from '../../actions/authActions';
class MainAdmin extends Component {
  state = {
    amount: '',
    details: '',
    dropmenu: false
  };

  componentWillUnmount() {
    this.props.clearErrors();
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const data = this.state;
    this.props.addToCollection(data);
    setTimeout(() => {
      this.props.clearMessages();
      this.props.clearErrors();
    }, 2000);
    this.setState({
      amount: '',
      details: ''
    });
  };

  onLogout = e => {
    e.preventDefault();
    this.props.logoutUser();
    this.props.setUser({});
  };

  onDeleteItems = () => {
    this.props.deleteCollectionItems();
  };
  onDeleteAll = () => {
    this.props.setUser({});
    this.props.deleteCollection();
    this.props.logoutUser();
  };

  //DROP DOWN MENU STUFF//

  showMenu = event => {
    event.preventDefault();
    this.setState({ dropmenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  };

  closeMenu = event => {
    if (!this.dropdownMenu) {
      return;
    }
    if (!this.dropdownMenu.contains(event.target)) {
      this.setState({ dropmenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });
    } else {
      return;
    }
  };
  //
  render() {
    const { errors } = this.props;
    const { name, sum, data } = this.props.collection.collection;
    const { text } = this.props.messages;
    let list;
    if (data.length !== 0) {
      list = data.map(element => (
        <CollectionItem element={element} key={element._id} />
      ));
    } else {
      list = null;
    }

    return (
      <div className="row center">
        <div className="col s12">
          <h1>{name}</h1>
        </div>
        <div className="col s12  m8 offset-m2 main_col">
          <div className="row ">
            <form
              className="col s12 m8 offset-m2 main_col__form"
              onSubmit={this.onSubmit}
            >
              <div className="row center">
                <div className="input-field col s12 m6 ">
                  <input
                    id="amount"
                    type="text"
                    value={this.state.amount}
                    onChange={this.onChange}
                    name="amount"
                    autoComplete="off"
                  />
                  <label htmlFor="amount">Amount</label>
                  {errors ? (
                    <span className="helper-text red-text">
                      {errors.amount}
                    </span>
                  ) : null}
                </div>
                <div className="input-field col s12 m6 ">
                  <input
                    id="details"
                    type="text"
                    value={this.state.details}
                    onChange={this.onChange}
                    name="details"
                    autoComplete="off"
                  />
                  <label htmlFor="details">Details</label>
                  {errors ? (
                    <span className="helper-text red-text">
                      {errors.details}
                    </span>
                  ) : null}
                </div>

                <button type="submit" className="waves-effect waves-light btn">
                  <i className="material-icons left">add_circle_outline</i>Add
                </button>
              </div>
            </form>
          </div>
          <div className="row">
            <div className="col s12 m8 offset-m2">
              <table className="highlight centered data_table">
                <thead className="teal lighten-2 white-text">
                  {text ? (
                    <div
                      className={classnames('black-text red message', {
                        ' green lighten-3': this.props.messages.type
                      })}
                    >
                      <div className="icon_wrapper">
                        <i className="material-icons medium center">done_all</i>
                        <h4> {text}</h4>
                      </div>
                    </div>
                  ) : null}
                  <tr>
                    <th>Amount</th>
                    <th>Details</th>
                    <th className="hide-on-small-only">Date</th>
                    <th />
                  </tr>
                </thead>

                <tbody>{list}</tbody>
              </table>
              <div className="row black-text">
                <h5> In Total: {sum} &#xa3;</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="hide-on-small-only bottom-menu">
          <div className="col s12 m10 offset-m1  l8 offset-l2 center action-buttons">
            <button
              onClick={this.onDeleteAll}
              className="waves-effect waves-light btn"
            >
              Delete Acc.
            </button>
            <button
              onClick={this.onDeleteItems}
              className="waves-effect waves-light btn"
            >
              Delete List
            </button>

            <button
              onClick={this.onLogout}
              className="waves-effect deep-orange darken-4 btn"
            >
              <i className="material-icons left">directions_run</i>Log Out
            </button>
          </div>
        </div>

        <div className="hide-on-med-and-up  drop-container col s12 center">
          <div className="row fixed">
            <button onClick={this.showMenu} className="btn col s12 center">
              <i className="material-icons center">menu</i>
            </button>
          </div>
          {this.state.dropmenu ? (
            <ul
              className="drop-ul s12"
              ref={element => {
                this.dropdownMenu = element;
              }}
            >
              <li>
                <button
                  onClick={this.onDeleteAll}
                  className="waves-effect grey darken-3 btn"
                >
                  Delete Acc.
                </button>
              </li>
              <li>
                <button
                  onClick={this.onDeleteItems}
                  className="waves-effect  grey darken-3 btn"
                >
                  Delete List
                </button>
              </li>

              <li>
                <button
                  onClick={this.onLogout}
                  className="waves-effect deep-orange darken-4 btn"
                >
                  <i className="material-icons left">directions_run</i>Log Out
                </button>
              </li>
            </ul>
          ) : null}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
  collection: state.collection,
  messages: state.messages
});
MainAdmin.propTypes = {
  auth: PropTypes.object.isRequired,
  collection: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired,
  addToCollection: PropTypes.func.isRequired,
  deleteCollectionItems: PropTypes.func.isRequired,
  deleteCollection: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  clearMessages: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired
};
export default connect(
  mapStateToProps,
  {
    addToCollection,
    deleteCollection,
    deleteCollectionItems,
    logoutUser,
    setUser,
    clearErrors,
    clearMessages
  }
)(MainAdmin);
