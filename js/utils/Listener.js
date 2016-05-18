import {
  SHOW_CONTAINER,
  HIDE_CONTAINER
} from '../constants/ActionTypes';

export default class Listener {
  constructor(messengerInstance) {
    this._messengerInstance = messengerInstance;
  }

  get messengerInstance() {
    return this._messengerInstance;
  }

  get types() {
    return [ SHOW_CONTAINER, HIDE_CONTAINER ];
  }

  setStore (store) {
    this.store = store;
  }

  // called when action from types is dispatched
  handleAction( action, dispatched, store ) {
    this.messengerInstance.dispatchEvent(action.type,
      store.getState().Container);
  }
}
