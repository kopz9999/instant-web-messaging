import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as reducers from '../reducers/index';
import DevTools from '../utils/DevTools';
import layerMiddleware from '../middleware/layerMiddleware';

// Middleware
let createStoreWithMiddleware = (layerClient) => {
// Configure the dev tools when in DEV mode
  if (__DEV__) {
    return compose(
      applyMiddleware(thunkMiddleware, layerMiddleware(layerClient)),
      DevTools.instrument()
    )(createStore);
  } else {
    return applyMiddleware(thunkMiddleware,
      layerMiddleware(layerClient))(createStore);
  }
};

const rootReducer = combineReducers(reducers);

export default function configureStore(layerClient, initialState) {
  return createStoreWithMiddleware(layerClient)(rootReducer, initialState);
}
