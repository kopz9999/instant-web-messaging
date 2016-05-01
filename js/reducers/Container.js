import {
  SHOW_CONTAINER,
  HIDE_CONTAINER
} from '../constants/ActionTypes';

const initialState = {
  isCollapsed: true,
};

export default function(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case SHOW_CONTAINER:
      return {
        isCollapsed: false,
      };
    case HIDE_CONTAINER:
      return {
        isCollapsed: true,
      };
    default:
      return state;
  }
}
