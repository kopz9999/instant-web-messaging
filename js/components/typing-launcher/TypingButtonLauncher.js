import React, { Component } from 'react';
// App
import styles from './Button.css';
import Bubble from './Bubble';

export default class TypingButtonLauncher extends Component {
  render() {
    const { conversation, containerActions } = this.props;
    const { showContainer } = containerActions;

    return conversation.activeConversationId != null && (
      <div className={styles.button} onClick={showContainer}>
        <div className={styles.bubble}>
          <Bubble conversationId={conversation.activeConversationId} />
        </div>
        <div className={styles.label}>
          Live Chat
        </div>
      </div>
    );
  };
}
