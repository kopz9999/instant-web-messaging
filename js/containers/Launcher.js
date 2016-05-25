import React, { Component } from 'react';
// App
import styles from './Wrapped.css';
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
      <div className={styles.wrapped} onClick={showContainer}>
        <Avatar url={clientUser.avatarURL} />
        { notification }
      </div>
    );
  };
}
