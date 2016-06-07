import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
// Layer
import { QueryBuilder } from 'layer-sdk';
// App
import MessageList from './MessageList';
import TypingIndicator from './TypingIndicator';
import styles from './ContentWrapper.css';
import Header from './Header';

/*
* This component is created to handle scroll
*/
export default class ContentWrapper extends Component {
  renderMessageList() {
    const { conversation, clientUser, consumerUser, isCollapsed,
      onMarkMessageRead, requestScrollDown } = this.props;
    return (
      <MessageList
        {
          ...({
            ...conversation,
            clientUser,
            consumerUser,
            isCollapsed,
            onMarkMessageRead,
            requestScrollDown
          })
        }
      />
    );
  }

  renderTypingIndicator() {
    const { clientUser, conversation, requestScrollDown } = this.props;
    const { activeConversationId } = conversation;
    return (
      <TypingIndicator
        clientUser={clientUser}
        conversationId={activeConversationId}
        onDisplay={requestScrollDown}
      />
    );
  }

  render() {
    const { conversation, closeButton } = this.props;
    const { activeConversationId } = conversation;
    const messageListReady = activeConversationId != null;
    const messageList = messageListReady ? this.renderMessageList() : null;
    const typingIndicator = messageListReady ?
      this.renderTypingIndicator() : null;

    return (
      <div className={styles.content}>
        <div className={styles.listContainer}>
          <Header
            user={clientUser}
            text={clientUser.displayName}
            extraContent={closeButton}
          />
        </div>
        <div className={styles.listContainer}>
          { messageList }
        </div>
      </div>
    );
  }
}
