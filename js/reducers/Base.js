import * as ActionTypes from '../constants/ActionTypes';

export default function(state = {}, action) {
  switch (action.type) {
    case ActionTypes.SETUP_CLIENT_USER:
      return {...state, clientUser: action.clientUser};
    default:
      return state;
  }
}
