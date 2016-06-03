import {
  SETUP_MESSAGE_NOTIFICATION,
  HIDE_MESSAGE_NOTIFICATION,
  RECEIVE_MESSAGE,
} from '../constants/ActionTypes';

const initialState = {
  displayNotification: false,
  displayInitialMessage: false
};

/*
* TODO: Add action for displaying initial message
* */
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
      };
    default:
      return state;
  }
}
