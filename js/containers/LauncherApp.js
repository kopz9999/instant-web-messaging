import React, { Component } from 'react';
import {Provider} from 'react-redux';
// Layer
import { LayerProvider } from 'layer-react';
// App
import MessengerProvider from './MessengerProvider';
import Launcher from './Launcher';
import MessageNotification from './MessageNotification';

export default class LauncherApp extends Component {
  render() {
    const { client, store, messageNotification } = this.props;

    return (
      <LayerProvider client={client}>
        <Provider store={store}>
          <MessengerProvider>
            <Launcher />
            <MessageNotification messageNotification={messageNotification} />
          </MessengerProvider>
        </Provider>
      </LayerProvider>
    );
  }
}
