import {
  CLIENT_READY,
  FETCH_USERS_SUCCESS,
}
  from '../constants/ActionTypes';

export function clientReady() {
  return {
    type: CLIENT_READY
  };
}

export function fetchUsersSuccess(clientUser, consumerUser) {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: {
      clientUser,
      consumerUser,
    }
  };
}