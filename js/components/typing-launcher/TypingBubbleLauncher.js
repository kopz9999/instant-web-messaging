import React, { Component } from 'react';
// App
import styles from './BubbleWrapper.css';
import Bubble from './Bubble';

export default class TypingBubbleLauncher extends Component {
  render() {
    const { conversation, containerActions } = this.props;
    const { showContainer } = containerActions;
    const messageReady = conversation.activeConversationId != null;
    const button = messageReady ?
      (<Bubble conversationId={conversation.activeConversationId} />) : null;

    return (
      <div className={styles.bubbleWrapper} onClick={showContainer}>
        { button }
      </div>
    );
  };
}
