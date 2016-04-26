import * as ActionTypes from '../constants/ActionTypes';

export default function(state = {}, action) {
  switch (action.type) {
    case ActionTypes.CLIENT_USER_SETUP:
      return {...state, clientUser: action.clientUser};
    default:
      return state;
  }
}
