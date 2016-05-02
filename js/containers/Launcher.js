import React, { Component } from 'react';
import { connect } from 'react-redux';
// App
import styles from './Launcher.css';
import Avatar from '../components/launcher/Avatar';
import Notification from '../components/launcher/Notification';

export default class Launcher extends Component {
  renderNotification(){
    const { clientUser, conversation } = this.props;
    return (
      <Notification
        {
          ...({
            ...conversation,
            clientUser
          })
        }
      />
    );
  }

  render() {
    const { clientUser, conversation, containerActions } = this.props;
    const { showContainer } = containerActions;
    const messageReady = conversation.activeConversationId != null;
    const notification = messageReady ? this.renderNotification() : null;

    return (
      <div className={styles.launcher} onClick={showContainer}>
        <Avatar url={clientUser.avatar.url} />
        { notification }
      </div>
    );
  };
}
