import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
// Layer
import { QueryBuilder } from 'layer-sdk';
// App
import MessageList from './MessageList';
import TypingIndicatorManager from './typing-indicator-manager/TypingIndicatorManager';
import styles from './ContentWrapper.css';
import Header from './Header';

/*
* This component is created to handle scroll
*/
export default class ContentWrapper extends Component {
  renderMessageList() {
    const { conversation, clientUser, consumerUser, isCollapsed,
      onMarkMessageRead, requestScrollDown, blankMessagesList } = this.props;
    return (
      <MessageList
        {
          ...({
            ...conversation,
            clientUser,
            consumerUser,
            isCollapsed,
            onMarkMessageRead,
            requestScrollDown,
            blankMessagesList
          })
        }
      />
    );
  }

  renderTypingIndicatorManager() {
    const { requestScrollDown } = this.props;
    const { activeConversationId } = this.props.conversation;
    return (
      <TypingIndicatorManager
        conversationId={activeConversationId}
        requestScrollDown={requestScrollDown}
      />
    );
  }

  render() {
    const { conversation, closeButton } = this.props;
    const { activeConversationId } = conversation;
    const messageListReady = activeConversationId != null;
    const messageList = messageListReady ? this.renderMessageList() : null;
    const typingIndicatorManager = messageListReady ?
      this.renderTypingIndicatorManager() : null;

    return (
      <div className={styles.content}>
        <div className={styles.listContainer}>
          <Header extraContent={closeButton} />
        </div>
        <div className={styles.listContainer}>
          { messageList }
        </div>
        <div className={styles.listContainer}>
          { typingIndicatorManager }
        </div>
      </div>
    );
  }
}
