import React, { Component } from 'react';
import {Provider} from 'react-redux';
import configureStore from '../store/configureStore';
import Launcher from './Launcher';
import Messenger from './Messenger';
import MessengerProvider from './MessengerProvider';
import styles from './App.css';
// Actions
import { fetchUsersSuccess } from '../actions/AppActions';

// Layer
import { Client } from 'layer-sdk';
import { LayerProvider } from 'layer-react';

// DevTools
import DevTools from '../utils/DevTools';

// @connect()
export default class App extends Component {
  static generateClient(appId, challengeCallback) {
    const client = new Client({ appId: appId });
    client.once('challenge', e => {
      challengeCallback(e.nonce, e.callback);
    });
    return client;
  }

  render() {
    const {
      appId, challengeCallback, clientUser, consumerUser
    } = this.props;
    const client = App.generateClient(appId, challengeCallback);
    const store = configureStore(client);

    store.dispatch(fetchUsersSuccess(clientUser, consumerUser));

    return (
      <div className={styles.app}>
        <LayerProvider client={client}>
          <Provider store={store}>
            <MessengerProvider>
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

/*
  NOTE:
    For now there are 2 static users, there's no need to keep users in
    the state.
*/

App.propTypes = {
  appId: React.PropTypes.string,
  challengeCallback: React.PropTypes.func,
  clientUser: React.PropTypes.object,
  consumerUser: React.PropTypes.object,
  welcomeMessage: React.PropTypes.string,
};
