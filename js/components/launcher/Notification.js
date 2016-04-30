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

export default class Notification extends Component {
  render() {
    const { messages, clientUser } = this.props;
    const notReadMessages = messages
      .filter((m) => (!m.isRead && m.sender.userId == clientUser.layerId ));
    const count = notReadMessages.length;

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

const ConnectedNotification = connectQuery({}, getQueries)(Notification);
export default ConnectedNotification;
