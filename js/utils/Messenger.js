// React
import ReactDOM from 'react-dom';
import React from 'react';
// Lib
import EventDispatcher from 'eventdispatcher';
import { Client } from 'layer-sdk';
// App
import MessengerApp from '../containers/MessengerApp';
import LauncherApp from '../containers/LauncherApp';
import CloseButtonWrapper from '../containers/CloseButtonWrapper';
import * as ViewModes from '../constants/ViewModes';
import configureStore from '../store/configureStore';
// Actions
import { fetchUsersSuccess } from '../actions/AppActions';
import { setupViewMode } from '../actions/ContainerActions';
import { setupMessageNotification } from '../actions/NotificationActions';

export default class Messenger {
  get client() {
    return this._client;
  }

  get store() {
    return this._store;
  }

  get messengerApp() {
    return this._messengerApp;
  }

  get launcherApp() {
    return this._launcherApp;
  }

  get closeButtonWrapper() {
    return this._closeButtonWrapper;
  }

  constructor(opts) {
    // Setup properties
    EventDispatcher.apply(this);
    // Initialize Methods
    this.initializeClient(opts);
    this.initializeStore();
    // Setup Methods
    this.setupStore(opts);
    this.setupComponents({
      ...opts, client: this.client, store: this.store
    });
  }

  /* Setup Methods */

  initializeClient(opts) {
    const { appId, challengeCallback } = opts;
    this._client = new Client({ appId: appId });
    this.client.once('challenge', e => {
      challengeCallback(e.nonce, e.callback);
    });
  }

  initializeStore() {
    this._store = configureStore(this.client, this);
  }

  setupComponents(opts) {
    const { messengerElement, launcherElement, closeButtonElement } = opts;

    this._messengerApp = ReactDOM.render(
      <MessengerApp
        {...opts}
      />,
      messengerElement);

    this._launcherApp = ReactDOM.render(
      <LauncherApp
        {...opts}
      />,
      launcherElement);

    this._closeButtonWrapper = ReactDOM.render(
      <CloseButtonWrapper
        {...opts}
      />,
      closeButtonElement);
  }

  setupStore(opts) {
    const { clientUser, consumerUser, viewMode, pageContentNode } = opts;

    this.store.dispatch(fetchUsersSuccess(clientUser, consumerUser));
    this.store.dispatch(setupMessageNotification());
    this.store.dispatch(setupViewMode(viewMode || ViewModes.OVERLAY,
      pageContentNode ));

  }
}

Object.assign( Messenger.prototype, EventDispatcher.prototype );
