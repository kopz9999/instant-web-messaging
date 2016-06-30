import React, { Component } from 'react';
// App
import styles from './Wrapped.css';
import Button from '../components/typing-launcher/Button';

export default class TypingLauncher extends Component {
  render() {
    const { conversation, containerActions } = this.props;
    const { showContainer } = containerActions;
    const messageReady = conversation.activeConversationId != null;
    const button = messageReady ?
      (<Button conversationId={conversation.activeConversationId} />) : null;

    return (
      <div className={styles.wrapped} onClick={showContainer}>
        { button }
      </div>
    );
  };
}
