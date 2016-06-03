// App
import {
  RECEIVE_LAYER_USER,
} from '../constants/ActionTypes';

export function receiveLayerUser(layerId, layerUser) {
  return {
    type: RECEIVE_LAYER_USER,
    payload: {
      layerId,
      layerUser,
    }
  }
}
