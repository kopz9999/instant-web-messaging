import React, { Component } from 'react';
import {Provider} from 'react-redux';
// Layer
import { LayerProvider } from 'layer-react';
// App
import WrappedMessenger from './WrappedMessenger';
import ModalMessenger from './ModalMessenger';
import Messenger from './Messenger';
import MessengerProvider from './MessengerProvider';
import * as VIEW_MODES from '../constants/ViewModes';

export default class MessengerApp extends Component {
  static propTypes = {
    appId: React.PropTypes.string,
    pageContentNode: React.PropTypes.object,
    viewMode: React.PropTypes.string,
    challengeCallback: React.PropTypes.func,
    clientUser: React.PropTypes.object,
    consumerUser: React.PropTypes.object,
    messenger: React.PropTypes.object,
    welcomeMessage: React.PropTypes.string,
    closeRoute: React.PropTypes.string,
    isWrapped: React.PropTypes.bool,
  };
  static defaultProps = {
    isWrapped: true
  };
  
  getMessengerComponent() {
    const { isWrapped, viewMode } = this.props;
    if (isWrapped) {
      switch (viewMode) {
        case VIEW_MODES.OVERLAY:
        case VIEW_MODES.SPLIT:
          return WrappedMessenger;
        case VIEW_MODES.MODAL:
          return ModalMessenger;
      }
    } else {
      return Messenger;
    }
  }

  render() {
    const { client, store, welcomeMessage, closeRoute,
      messengerElement } = this.props;
    const MessengerComponent = this.getMessengerComponent();

    return (
      <LayerProvider client={client}>
        <Provider store={store}>
          <MessengerProvider>
            <MessengerComponent
              messengerElement={messengerElement}
              welcomeMessage={welcomeMessage}
              closeRoute={closeRoute} />
          </MessengerProvider>
        </Provider>
      </LayerProvider>
    );
  }
}
