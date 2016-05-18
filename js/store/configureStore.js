import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as reducers from '../reducers/index';
import DevTools from '../utils/DevTools';
import layerMiddleware from '../middleware/layerMiddleware';
import listen from 'redux-action-listeners';
import Listener from '../utils/Listener';

// Middleware
let createStoreWithMiddleware = (layerClient, messengerInstance) => {
// Configure the dev tools when in DEV mode
  let listener = new Listener(messengerInstance);
  if (__DEV__) {
    return compose(
      applyMiddleware(thunkMiddleware,
        listen(listener),
        layerMiddleware(layerClient)),
      DevTools.instrument()
    )(createStore);
  } else {
    return applyMiddleware(thunkMiddleware,
      listen(listener),
      layerMiddleware(layerClient))(createStore);
  }
};

const rootReducer = combineReducers(reducers);

export default function configureStore(layerClient, messengerInstance, initialState) {
  return createStoreWithMiddleware(layerClient,
    messengerInstance)(rootReducer, initialState);
}
