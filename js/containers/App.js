import React, { Component } from 'react';
import {Provider} from 'react-redux';
// Layer
import { Client } from 'layer-sdk';
import { LayerProvider } from 'layer-react';
// App
import configureStore from '../store/configureStore';
import Launcher from './Launcher';
import Messenger from './Messenger';
import MessengerProvider from './MessengerProvider';
import styles from './App.css';
import * as ViewModes from '../constants/ViewModes';
// Actions
import { fetchUsersSuccess } from '../actions/AppActions';
import { setupViewMode } from '../actions/ContainerActions';

// DevTools
import DevTools from '../utils/DevTools';

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
      appId, challengeCallback, clientUser, consumerUser, viewMode,
      pageContentNode
    } = this.props;
    const client = App.generateClient(appId, challengeCallback);
    const store = configureStore(client);

    store.dispatch(fetchUsersSuccess(clientUser, consumerUser));
    store.dispatch(setupViewMode( viewMode || ViewModes.OVERLAY,
      pageContentNode ));

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

App.propTypes = {
  appId: React.PropTypes.string,
  pageContentNode: React.PropTypes.object,
  viewMode: React.PropTypes.string,
  challengeCallback: React.PropTypes.func,
  clientUser: React.PropTypes.object,
  consumerUser: React.PropTypes.object,
  welcomeMessage: React.PropTypes.string,
};
