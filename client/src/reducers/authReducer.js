import { SET_USER } from '../actions/types';

const initialState = {
  isAutheticated: false,
  user: {},
  id: ''
};
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAutheticated: action.payload.isAutheticated,
        user: action.payload.userType,
        id: action.payload.id
      };
    default: {
      return state;
    }
  }
}
