import ACTION_EVENTS from '../constants/ActionEvents';

export default class Listener {
  static processTypes() {
    let arr = [];
    for (let action in ACTION_EVENTS) arr.push(action);
    return arr;
  }

  constructor(messengerInstance) {
    this._messengerInstance = messengerInstance;
    this._types = Listener.processTypes();
  }

  get messengerInstance() {
    return this._messengerInstance;
  }

  get types() {
    return this._types;
  }

  setStore (store) {
    this.store = store;
  }

  // called when action from types is dispatched
  handleAction( action, dispatched, store ) {
    switch (action.type) {
      case ACTION_EVENTS.SHOW_CONTAINER:
      case ACTION_EVENTS.HIDE_CONTAINER:
        this.messengerInstance.dispatchEvent(action.type,
          store.getState().Container);
        break;
    }
  }
}
