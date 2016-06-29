import React, { Component } from 'react';
import {Provider} from 'react-redux';
// Layer
import { LayerProvider } from 'layer-react';
// App
import MessengerProvider from './MessengerProvider';
import Launcher from './Launcher';
import MessageNotification from './MessageNotification';
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
            <Launcher />
            <NotificationManager />
          </MessengerProvider>
        </Provider>
      </LayerProvider>
    );
  }
}
