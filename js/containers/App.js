import React, { Component } from 'react';
import {Provider} from 'react-redux';
import configureStore from '../store/configureStore';
import Launcher from './Launcher';
import Messenger from './Messenger';
import MessengerProvider from './MessengerProvider';
import styles from './App.css';
// DevTools
import DevTools from '../utils/DevTools';

const store = configureStore();

// @connect()
export default class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <Provider store={store}>
          <MessengerProvider clientUser={this.props.clientUser}>
            <Launcher />
            <Messenger welcomeMessage={this.props.welcomeMessage} />
          </MessengerProvider>
        </Provider>
        <DevTools store={store}/>
      </div>
    );
  }
}
