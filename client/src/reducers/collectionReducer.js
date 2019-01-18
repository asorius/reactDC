import {
  GET_COLLECTION,
  ADDTO_COLLECTION,
  SET_EDITION,
  COLLECTION_LOADING,
  CLEAR_EDITION,
  LOGOUT,
  DELETE_COLLECTION
} from '../actions/types';

const initialState = {
  loading: true
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_COLLECTION:
      return {
        ...state,
        collection: action.payload,
        loading: false
      };
    case COLLECTION_LOADING:
      return {
        ...state,
        loading: true
      };
    case ADDTO_COLLECTION:
      return {
        ...state,
        loading: false,
        collection: action.payload
      };
    case DELETE_COLLECTION:
      return {
        ...state,
        loading: false,
        collection: null
      };
    case SET_EDITION:
      return {
        ...state,
        edition: action.payload
      };
    case CLEAR_EDITION:
      return {
        ...state,
        edition: false
      };
    case LOGOUT:
      return {
        ...state,
        loading: false,
        collection: null
      };

    default: {
      return state;
    }
  }
}
