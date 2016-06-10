// React
import ReactDOM from 'react-dom';
import React from 'react';
// Lib
import EventDispatcher from 'eventdispatcher';
import { Client } from 'layer-sdk';
// App
import MessengerApp from '../containers/MessengerApp';
import LauncherApp from '../containers/LauncherApp';
import CloseButton from '../containers/CloseButton';
import DevTools from './DevTools';
import * as VIEW_MODES from '../constants/ViewModes';
import configureStore from '../store/configureStore';
import { conversationManagerInstance } from '../utils/ConversationManager';
// Actions
import { fetchUsersSuccess } from '../actions/AppActions';
import { receiveLayerUser } from '../actions/LayerUsersActions';

import { setupViewMode, showContainer, hideContainer } from '../actions/ContainerActions';
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

  get closeButton() {
    return this._closeButton;
  }

  constructor(opts) {
    // Setup properties
    EventDispatcher.apply(this);
    // Initialize Methods
    this.initializeConversationManager(opts);
    this.initializeClient(opts);
    this.initializeStore();
    // Setup Methods
    this.setupStore(opts);
    this.setupComponents({
      ...opts, client: this.client, store: this.store
    });
  }

  /* Setup Methods */

  // TODO: Remove middleware
  initializeConversationManager(opts) {
    if (opts.canUpdateMetadata !== undefined) {
      conversationManagerInstance.canUpdateMetadata = opts.canUpdateMetadata;
    }
  }

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

  renderMessengerApp(opts) {
    this._messengerApp = ReactDOM.render(
      <MessengerApp
        {...opts}
      />,
      opts.messengerElement);
  }

  renderLauncherApp(opts) {
    this._launcherApp = ReactDOM.render(
      <LauncherApp
        {...opts}
      />,
      opts.launcherElement);
  }

  renderCloseButtonApp(opts) {
    this._closeButton = ReactDOM.render(
      <CloseButton
        {...opts}
      />,
      opts.closeButtonElement);
  }

  setupComponents(opts) {
    const { devToolsNode, viewMode } = opts;
    switch (viewMode) {
      case VIEW_MODES.NOTIFICATIONS:
        this.renderLauncherApp(opts);
        break;
      case VIEW_MODES.FULL_SCREEN:
        this.renderMessengerApp(opts);
        break;
      default:
        this.renderMessengerApp(opts);
        this.renderLauncherApp(opts);
        this.renderCloseButtonApp(opts);
        break;
    }
    if (devToolsNode && DevTools !== null) {
      ReactDOM.render(
        <DevTools
          {...opts}
        />,
        devToolsNode);
    }
  }

  setupStore(opts) {
    const { clientUser, consumerUser, viewMode, pageContentNode } = opts;

    this.store.dispatch(fetchUsersSuccess(clientUser, consumerUser));
    this.store.dispatch(receiveLayerUser(clientUser.layerId, clientUser));
    this.store.dispatch(receiveLayerUser(consumerUser.layerId, consumerUser));
    // TODO: Use settings
    // this.store.dispatch(setupMessageNotification());
    this.store.dispatch(setupViewMode(viewMode || VIEW_MODES.OVERLAY,
      pageContentNode ));

    if (viewMode == VIEW_MODES.FULL_SCREEN) {
      this.store.dispatch(showContainer());
    }
  }

  show() {
    this.store.dispatch(showContainer());
  }

  hide() {
    this.store.dispatch(hideContainer());
  }
}

Object.assign( Messenger.prototype, EventDispatcher.prototype );
