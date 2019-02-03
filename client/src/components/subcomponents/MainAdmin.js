import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CollectionItem from './CollectionItem';
import {
  addToCollection,
  editCollectionItem,
  deleteCollectionItems,
  deleteCollection,
  logoutUser,
  clearErrors,
  clearEdition,
  clearMessages,
  getCollection
} from '../../actions/collectionActions';
import { setUser } from '../../actions/authActions';
//alert stuff
import Swal from 'sweetalert2';

//
class MainAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      details: '',
      dropmenu: false,
      focus: false
    };

    this.inputRef = React.createRef();
    this.inputRef2 = React.createRef();
    this.tbody = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.collection.edition !== prevProps.collection.edition &&
      this.props.collection.edition
    ) {
      const { amount, details } = this.props.collection.edition;
      this.setState({ amount, details, focus: true });
    }
    if (this.state.focus === true) {
      this.inputRef.current.focus();
    }
    this.tbody.current.scrollTop = 0;

    return;
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  editItem = e => {
    e.preventDefault();
    const { _id: id } = this.props.collection.edition;
    const { amount, details } = this.state;
    this.props.editCollectionItem({ id, amount, details });
    setTimeout(() => {
      this.props.clearMessages();
      this.props.clearErrors();
      this.props.clearEdition();
    }, 2000);
    this.setState({
      amount: '',
      details: '',
      labels: false,
      focus: false
    });

    this.tbody.current.scrollTop = 0;
  };
  closeEdition = e => {
    e.preventDefault();

    this.props.clearEdition();
    this.setState({
      amount: '',
      details: '',
      labels: false,
      focus: false
    });

    this.tbody.current.scrollTop = 0;
  };
  onSubmit = e => {
    e.preventDefault();
    const data = this.state;
    this.setState({ labels: !this.state.labels });
    this.props.addToCollection(data);
    setTimeout(() => {
      this.props.clearMessages();
      this.props.clearErrors();
      this.props.clearEdition();
      this.setState({ labels: !this.state.labels });
    }, 2000);
    this.setState({
      amount: '',
      details: ''
    });

    this.tbody.current.scrollTop = 0;
  };

  onLogout = e => {
    e.preventDefault();
    this.props.logoutUser();
    this.props.setUser({});
  };

  onDeleteItems = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then(result => {
      if (result.value) {
        Swal.fire('Deleted!').then(() => {
          this.props.deleteCollectionItems();
        });
      }
    });
    this.setState({ dropmenu: !this.state.dropmenu });
  };
  onDeleteAll = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then(result => {
      if (result.value) {
        Swal.fire('Deleted!', 'Your account has been deleted.', 'success').then(
          () => {
            this.props.setUser({});
            this.props.deleteCollection();
            this.props.logoutUser();
            window.location.reload();
          }
        );
      }
    });
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
    if (this.dropdownMenu.classList.contains('closable')) {
      this.setState({ dropmenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });
    } else if (!this.dropdownMenu.contains(event.target)) {
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
    const edition = this.props.collection.edition;
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
            <form className="col s12 m8 offset-m2 main_col__form">
              <div className="row center">
                <div className="input-field col s6 m6 ">
                  <input
                    ref={this.inputRef}
                    id="amount"
                    type="text"
                    value={this.state.amount || ''}
                    onChange={this.onChange}
                    name="amount"
                    autoComplete="off"
                  />
                  <label
                    ref={this.labelRef}
                    htmlFor="amount"
                    className={classnames({
                      active: this.props.collection.edition || this.state.labels
                    })}
                  >
                    Amount
                  </label>
                  {errors ? (
                    <span className="helper-text red-text">
                      {errors.amount}
                    </span>
                  ) : null}
                </div>
                <div className="input-field col s6 m6 ">
                  <input
                    ref={this.inputRef2}
                    id="details"
                    type="text"
                    value={this.state.details || ''}
                    onChange={this.onChange}
                    name="details"
                    autoComplete="off"
                  />
                  <label
                    ref={this.labelRef2}
                    htmlFor="details"
                    className={classnames({
                      active: this.props.collection.edition || this.state.labels
                    })}
                  >
                    Details
                  </label>
                  {errors ? (
                    <span className="helper-text red-text">
                      {errors.details}
                    </span>
                  ) : null}
                </div>
                {edition ? (
                  <React.Fragment>
                    <button
                      onClick={this.editItem}
                      className="waves-effect waves-light blue btn"
                    >
                      <i className="material-icons left">save</i>
                      Save
                    </button>{' '}
                    <button
                      onClick={this.closeEdition}
                      className="btn-floating btn-small waves-effect waves-light  blue-grey lighten-2 btn "
                    >
                      <i className="material-icons right">close</i>
                    </button>
                  </React.Fragment>
                ) : (
                  <button
                    onClick={this.onSubmit}
                    className="waves-effect waves-light btn grey darken-3"
                  >
                    <i className="material-icons left teal-text">
                      add_circle_outline
                    </i>
                    Add
                  </button>
                )}
              </div>
            </form>
          </div>
          <div className="row">
            <div className="col s12 m10 offset-m1 ">
              <table className="highlight centered data_table">
                <thead className="grey darken-3 white-text">
                  <tr>
                    <th className="item_amount">Amount</th>
                    <th>Details</th>
                    <th>Date</th>
                    <th className="del_cell" />
                  </tr>
                </thead>

                <tbody ref={this.tbody} className="relate">
                  {text ? (
                    <tr>
                      <td
                        className={classnames('msg_del message ', {
                          ' msg_add': this.props.messages.type
                        })}
                      >
                        <div className="icon_wrapper">
                          <i className="material-icons small center">
                            done_all
                          </i>
                          <p> {text}</p>
                        </div>
                      </td>
                    </tr>
                  ) : null}
                  {list}
                </tbody>
              </table>
              <div className="row black-text">
                <h5> In Total: {sum} &#xa3;</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="hide-on-small-only bottom-menu ">
          <div className="col s12 m10 offset-m1  l8 offset-l2 center action-buttons ">
            <button
              onClick={this.onDeleteAll}
              className="waves-effect waves-light btn grey lighten-2 black-text"
            >
              Delete Acc.
            </button>
            <button
              onClick={this.onDeleteItems}
              className="waves-effect waves-light btn grey lighten-2 black-text"
            >
              Delete List
            </button>

            <button
              onClick={this.onLogout}
              className="waves-effect deep-orange darken-4 btn"
            >
              <i className="material-icons left  teal-text">directions_run</i>
              Log Out
            </button>
          </div>
        </div>

        <div className="hide-on-med-and-up  drop-container col s12 center ">
          <div className="row fixed">
            <button
              onClick={this.showMenu}
              className="btn col s12 center grey darken-3"
            >
              <i className="material-icons center">menu</i>
            </button>
          </div>
          {this.state.dropmenu ? (
            <ul
              className={classnames('drop-ul s12', {
                closable: this.state.dropmenu
              })}
              ref={element => {
                this.dropdownMenu = element;
              }}
            >
              <li>
                <button
                  onClick={this.onDeleteAll}
                  className="waves-effect btn dropbtn"
                >
                  Delete Acc.
                </button>
              </li>
              <li>
                <button
                  onClick={this.onDeleteItems}
                  className="waves-effect   btn dropbtn"
                >
                  Delete List
                </button>
              </li>

              <li>
                <button
                  onClick={this.onLogout}
                  className="waves-effect deep-orange darken-4 btn"
                >
                  <i className="material-icons left teal-text">
                    directions_run
                  </i>
                  Log Out
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
  editCollectionItem: PropTypes.func.isRequired,
  deleteCollectionItems: PropTypes.func.isRequired,
  deleteCollection: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  clearMessages: PropTypes.func.isRequired,
  clearEdition: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  getCollection: PropTypes.func.isRequired
};
export default connect(
  mapStateToProps,
  {
    addToCollection,
    editCollectionItem,
    deleteCollection,
    deleteCollectionItems,
    logoutUser,
    setUser,
    clearErrors,
    clearEdition,
    clearMessages,
    getCollection
  }
)(MainAdmin);
