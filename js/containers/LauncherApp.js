import React, { Component } from 'react';
import {Provider} from 'react-redux';
// Layer
import { LayerProvider } from 'layer-react';
// App
import MessengerProvider from './MessengerProvider';
import NotificationLauncher from './NotificationLauncher';
import TypingLauncher from './TypingLauncher';
import NotificationManager from './NotificationManager';

export default class LauncherApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowingModal: false,
    };
  }

  render() {
    const { client, store, messageNotification } = this.props;

    return (
      <LayerProvider client={client}>
        <Provider store={store}>
          <MessengerProvider>
            <TypingLauncher />
            <NotificationManager />
          </MessengerProvider>
        </Provider>
      </LayerProvider>
    );
  }
}
