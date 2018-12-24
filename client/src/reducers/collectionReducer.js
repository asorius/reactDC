import {
  GET_COLLECTION,
  ADDTO_COLLECTION,
  // DELETE_COLLECTION_ITEM,
  // DELETE_COLLECTION_ITEMS,
  // DELETE_COLLECTION,
  COLLECTION_LOADING,
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
