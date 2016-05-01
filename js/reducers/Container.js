import {
  SHOW_CONTAINER,
  HIDE_CONTAINER,
  SETUP_VIEW_MODE
} from '../constants/ActionTypes';

import * as ViewModes from '../constants/ViewModes';

const initialState = {
  isCollapsed: true,
  viewMode: ViewModes.OVERLAY,
  pageContentNode: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SHOW_CONTAINER:
      return {
        ...state,
        isCollapsed: false,
      };
    case HIDE_CONTAINER:
      return {
        ...state,
        isCollapsed: true,
      };
    case SETUP_VIEW_MODE:
      return {
        ...state,
        viewMode: payload.viewMode,
        pageContentNode: payload.pageContentNode
      };
    default:
      return state;
  }
}
