import { SET_USER } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {},
  id: ''
};
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.userType,
        id: action.payload.id
      };
    default: {
      return state;
    }
  }
}
