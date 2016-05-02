import {
  SETUP_MESSAGE_NOTIFICATION,
  HIDE_MESSAGE_NOTIFICATION
}
  from '../constants/ActionTypes';

export function setupMessageNotification() {
  return {
    type: SETUP_MESSAGE_NOTIFICATION
  };
}

export function hideMessageNotification() {
  return {
    type: HIDE_MESSAGE_NOTIFICATION
  };
}
