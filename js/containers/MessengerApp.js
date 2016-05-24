import React, { Component } from 'react';
import {Provider} from 'react-redux';
// Layer
import { LayerProvider } from 'layer-react';
// App
import Messenger from './Messenger';
import MessengerProvider from './MessengerProvider';

export default class MessengerApp extends Component {
  render() {
    const { client, store, welcomeMessage } = this.props;

    return (
      <LayerProvider client={client}>
        <Provider store={store}>
          <MessengerProvider>
            <Messenger welcomeMessage={welcomeMessage} />
          </MessengerProvider>
        </Provider>
      </LayerProvider>
    );
  }
}

MessengerApp.propTypes = {
  appId: React.PropTypes.string,
  pageContentNode: React.PropTypes.object,
  viewMode: React.PropTypes.string,
  challengeCallback: React.PropTypes.func,
  clientUser: React.PropTypes.object,
  consumerUser: React.PropTypes.object,
  messenger: React.PropTypes.object,
  welcomeMessage: React.PropTypes.string,
};
