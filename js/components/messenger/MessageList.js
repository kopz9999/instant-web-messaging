import React, { Component } from 'react';
import styles from './MessagesList.css';
// Layer
import { QueryBuilder } from 'layer-sdk';
import { connectQuery } from 'layer-react';

const getQueries = ({activeConversationId, messagePagination}) => {
  return {
    messages: QueryBuilder
      .messages()
      .forConversation(activeConversationId)
      .paginationWindow(messagePagination)
  };
};


export default class MessageList extends Component {
  render() {
    console.log(this.props.messages);
    return (
      <div className={styles.list}>
      </div>
    );
  };
};

const ConnectedMessageList = connectQuery({}, getQueries)(MessageList);
export default ConnectedMessageList;
