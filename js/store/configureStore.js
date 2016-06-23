import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import * as reducers from '../reducers/index';
import layerMiddleware from '../middleware/layerMiddleware';
import listen from 'redux-action-listeners';
import Listener from '../utils/Listener';

// Middleware
let createStoreWithMiddleware = (layerClient, messengerInstance) => {
// Configure the dev tools when in DEV mode
  let listener = new Listener(messengerInstance);
  const middleware = [
    thunkMiddleware,
    listen(listener),
    layerMiddleware(layerClient, messengerInstance),
    __DEV__ && createLogger()
  ].filter(Boolean);
  return applyMiddleware(...middleware)(createStore);
};

const rootReducer = combineReducers(reducers);

export default function configureStore(layerClient, messengerInstance, initialState) {
  return createStoreWithMiddleware(layerClient,
    messengerInstance)(rootReducer, initialState);
}
