import React, { Component } from 'react';
// App
import styles from './../../containers/Wrapped.css';
import Avatar from './Avatar';
import Notification from './Notification';

export default class AvatarLauncher extends Component {
  renderNotification(){
    const { consumerUser, conversation } = this.props;
    return (
      <Notification
        {
          ...({
            ...conversation,
            consumerUser
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
