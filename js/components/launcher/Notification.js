import React, { Component, PropTypes } from 'react';
import styles from './Notification.css';
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

class Notification extends Component {
  render() {
    const { messages } = this.props;
    const notReadMessages = messages
      .filter((m) => (m.isUnread ));
    const count = notReadMessages.length + 1;

    return (
      <div className={styles.notification}>
        <div className={styles.number}>
          { count }
        </div>
      </div>
    );
  }
};

Notification.propTypes = {
  count: React.PropTypes.number
};

export default connectQuery({}, getQueries)(Notification);
