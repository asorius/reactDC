import { SET_USER, CLEAR_ERRORS } from '../actions/types';

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
    default: {
      return state;
    }
    case CLEAR_ERRORS:
      return {};
  }
}
