import {
  CLIENT_READY,
  FETCH_USERS_SUCCESS
} from '../constants/ActionTypes';

const initialState = {
  ready: false,
  clientReady: false,
  clientUser: null,
  consumerUser: null
};

export default function(state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case CLIENT_READY:
      return {
        ...state,
        ready: state.usersLoaded,
        clientReady: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        ready: state.clientReady,
        usersLoaded: true,
        consumerUser: payload.consumerUser,
        clientUser: payload.clientUser,
      };
    default:
      return state;
  }
}
