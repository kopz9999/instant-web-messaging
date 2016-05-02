import {
  SHOW_CONTAINER,
  HIDE_CONTAINER,
  SETUP_VIEW_MODE,
  SHOW_HEADER,
  HIDE_HEADER,
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

export function showHeader() {
  return {
    type: SHOW_HEADER,
  };
}

export function hideHeader() {
  return {
    type: HIDE_HEADER,
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
