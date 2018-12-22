import { SET_USER, CLEAR_ERRORS, SET_CURRENT_USER } from '../actions/types';

const initialState = {
  isAutheticated: false,
  user: {}
};
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        isAutheticated: true
      };
    case CLEAR_ERRORS:
      return {};
    case SET_CURRENT_USER: {
      return {
        ...state,
        isAutheticated: true,
        user: action.payload.userType
      };
    }
    default: {
      return state;
    }
  }
}
