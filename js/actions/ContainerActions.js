import {
  SHOW_CONTAINER,
  HIDE_CONTAINER,
}
  from '../constants/ActionTypes';

export function showContainer() {
  return {
    type: SHOW_CONTAINER,
  };
}

export function hideContainer() {
  return {
    type: HIDE_CONTAINER,
  };
}
