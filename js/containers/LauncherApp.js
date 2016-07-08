// React
import React, { Component } from 'react';
import {Provider} from 'react-redux';
// Layer
import { LayerProvider } from 'layer-react';
// App
import LAUNCHER_MODES from '../constants/LauncherModes';
import MessengerProvider from './MessengerProvider';
import AvatarLauncher from '../components/avatar-launcher/AvatarLauncher';
import TypingBubbleLauncher from './../components/typing-launcher/TypingBubbleLauncher';
import TypingButtonLauncher from './../components/typing-launcher/TypingButtonLauncher';
import NotificationManager from './NotificationManager';

export default class LauncherApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowingModal: false,
    };
  }

  renderLauncher() {
    const { launcherMode } = this.props;
    switch (launcherMode) {
      case LAUNCHER_MODES.TYPING_BUBBLE:
        return (<TypingBubbleLauncher />);
      case LAUNCHER_MODES.TYPING_BUBBLE_BUTTON:
        return (<TypingButtonLauncher />);
      case LAUNCHER_MODES.AVATAR_BUBBLE:
        return (<AvatarLauncher />);
      default:
        return (<TypingButtonLauncher />);
    }
  }

  render() {
    const { client, store } = this.props;

    return (
      <LayerProvider client={client}>
        <Provider store={store}>
          <MessengerProvider>
            { this.renderLauncher() }
            <NotificationManager />
          </MessengerProvider>
        </Provider>
      </LayerProvider>
    );
  }
}
