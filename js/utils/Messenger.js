import ReactDOM from 'react-dom';
import React from 'react';
import EventDispatcher from 'eventdispatcher';
import App from '../containers/App';
import { MESSENGER_SHEET_RENDERED } from '../constants/ActionTypes';

export default class Messenger {
  get app() {
    return this._app;
  }

  get sheet() {
    return this._sheet;
  }

  setMessengerSheet(value) {
    this._sheet = value;
    this.dispatchEvent(MESSENGER_SHEET_RENDERED, { node: this._sheet } );
  }

  constructor(targetNode, opts) {
    EventDispatcher.apply(this);
    opts['messengerInstance'] = this;
    this._app = ReactDOM.render(
      <App
        {...opts}
      />,
      targetNode);
  }
}

Object.assign( Messenger.prototype, EventDispatcher.prototype );
