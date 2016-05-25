import React, { Component } from 'react';
import {Provider} from 'react-redux';
// Layer
import { LayerProvider } from 'layer-react';
// App
import WrappedMessenger from './WrappedMessenger';
import Messenger from './Messenger';
import MessengerProvider from './MessengerProvider';

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
    isWrapped: React.PropTypes.bool,
  };
  static defaultProps = {
    isWrapped: true
  };

  render() {
    const { client, store, welcomeMessage, isWrapped } = this.props;
    const MessengerComponent = isWrapped ? WrappedMessenger : Messenger;

    return (
      <LayerProvider client={client}>
        <Provider store={store}>
          <MessengerProvider>
            <MessengerComponent welcomeMessage={welcomeMessage} />
          </MessengerProvider>
        </Provider>
      </LayerProvider>
    );
  }
}
