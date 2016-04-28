import React, { Component } from 'react';
import {Provider} from 'react-redux';
import configureStore from '../store/configureStore';
import Launcher from './Launcher';
import Messenger from './Messenger';
import MessengerProvider from './MessengerProvider';
import styles from './App.css';
// Layer
import { Client } from 'layer-sdk';
import { LayerProvider } from 'layer-react';

// DevTools
import DevTools from '../utils/DevTools';

const store = configureStore();

// @connect()
export default class App extends Component {
  constructor(props) {
    super(props);
    // TODO: Is this correct?
    this.client = this.generateClient();
  }

  generateClient() {
    const client = new Client({
      appId: this.props.appId
    });
    const challengeCallback = this.props.challengeCallback;
    client.once('challenge', e => {
      challengeCallback(e.nonce, e.callback);
    });
    return client;
  }

  render() {
    return (
      <div className={styles.app}>
        <LayerProvider client={this.client}>
          <Provider store={store}>
            <MessengerProvider clientUser={this.props.clientUser}>
              <Launcher />
              <Messenger welcomeMessage={this.props.welcomeMessage} />
            </MessengerProvider>
          </Provider>
        </LayerProvider>
        <DevTools store={store}/>
      </div>
    );
  }
}

App.propTypes = {
  appId: React.PropTypes.string,
  challengeCallback: React.PropTypes.func,
  clientUser: React.PropTypes.object,
  welcomeMessage: React.PropTypes.string,
};
