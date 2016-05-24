import React, { Component } from 'react';
import {Provider} from 'react-redux';
// Layer
import { LayerProvider } from 'layer-react';
// App
import Messenger from './Messenger';
import MessengerProvider from './MessengerProvider';
// DevTools
// import DevTools from '../utils/DevTools';

export default class MessengerApp extends Component {
  getDevTools() {
    const DevTools = require('../utils/DevTools').default;
    return (<DevTools />);
  }

  renderDevTools() {
    return (__DEV__) ? this.getDevTools() : null;
  }

  render() {
    const { client, store, welcomeMessage } = this.props;
    const DevTools = this.renderDevTools();

    return (
      <LayerProvider client={client}>
        <Provider store={store}>
          <MessengerProvider extraComponent={DevTools}>
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
