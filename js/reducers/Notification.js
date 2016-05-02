import {
  SETUP_MESSAGE_NOTIFICATION,
  HIDE_MESSAGE_NOTIFICATION,
  RECEIVE_MESSAGE,
} from '../constants/ActionTypes';

const initialState = {
  displayNotification: true,
  displayInitialMessage: false
};

export default function(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case RECEIVE_MESSAGE:
      return {
        ...state,
        displayNotification: true
      };
    case SETUP_MESSAGE_NOTIFICATION:
      return {
        ...state,
        displayNotification: true,
        displayInitialMessage: true
      };
    case HIDE_MESSAGE_NOTIFICATION:
      return {
        ...state,
        displayNotification: false,
        displayInitialMessage: false,
      };
    default:
      return state;
  }
}
