import {
  SHOW_CONTAINER,
  HIDE_CONTAINER,
  SETUP_VIEW_MODE
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

export function setupViewMode(viewMode, pageContentNode){
  return {
    type: SETUP_VIEW_MODE,
    payload: {
      viewMode,
      pageContentNode
    }
  };
}
