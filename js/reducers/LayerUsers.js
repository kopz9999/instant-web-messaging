import {
  RECEIVE_LAYER_USER,
} from '../constants/ActionTypes';

export default function(state = {}, action) {
  const { payload, type } = action;

  switch (type) {
    case RECEIVE_LAYER_USER:
      return {
        ...state,
        [payload.layerId]: payload.layerUser
      };
    default:
      return state;
  }
}
