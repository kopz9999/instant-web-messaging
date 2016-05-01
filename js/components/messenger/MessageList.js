import React, { Component } from 'react';
// Layer
import { QueryBuilder } from 'layer-sdk';
import { connectQuery } from 'layer-react';
// App
import  MessageListItem from './MessageListItem';
import styles from './MessagesList.css';

const getQueries = ({activeConversationId, messagePagination}) => {
  return {
    messages: QueryBuilder
      .messages()
      .forConversation(activeConversationId)
      .paginationWindow(messagePagination)
  };
};

export default class MessageList extends Component {
  componentDidUpdate() {
    this.props.requestScrollDown();
  }

  renderMessageItem(message) {
    const { clientUser, consumerUser } = this.props;
    return (
      <MessageListItem
        key={message.id}
        message={message}
        clientUser={clientUser}
        consumerUser={consumerUser}
      />
    );
  }

  render() {
    const reversedMessages = this.props.messages.concat().reverse();
    return (
      <div className={styles.list}>
        {reversedMessages.map((m)=> this.renderMessageItem(m))}
      </div>
    );
  };
};

MessageList.propTypes = {
  messages: React.PropTypes.array,
  clientUser: React.PropTypes.object,
  consumerUser: React.PropTypes.object,
};

const ConnectedMessageList = connectQuery({}, getQueries)(MessageList);
export default ConnectedMessageList;
