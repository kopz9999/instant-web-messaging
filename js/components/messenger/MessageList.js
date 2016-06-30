import React, { Component } from 'react';
// Layer
import { QueryBuilder } from 'layer-sdk';
import { connectQuery } from 'layer-react';
import { connect } from 'react-redux';
// App
import  MessageListItem from './message-list-item/MessageListItem';
import styles from './MessagesList.css';

function mapStateToProps({ LayerUsers }) {
  return {
    layerUsers: LayerUsers,
  };
}

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
    const { clientUser, consumerUser, isCollapsed,
      onMarkMessageRead, layerUsers } = this.props;
    const senderUser = layerUsers[message.sender.userId];
    if (senderUser) {
      return (
        <MessageListItem
          key={message.id}
          message={message}
          senderUser={senderUser}
          clientUser={clientUser}
          consumerUser={consumerUser}
          canMarkRead={!isCollapsed}
          onMarkMessageRead={onMarkMessageRead}
        />
      );
    } else {
      return null;
    }
  }

  render() {
    const { messages, blankMessagesList } = this.props;
    const reversedMessages = messages.filter((m)=> m.isSaved).reverse();

    return (
      messages.length > 0 ?
        (<div className={styles.list}>
          {reversedMessages.map((m)=> this.renderMessageItem(m))}
        </div>) : blankMessagesList);
  };
};

MessageList.propTypes = {
  messages: React.PropTypes.array,
  clientUser: React.PropTypes.object,
  consumerUser: React.PropTypes.object,
};

const ConnectedMessageList = connect(mapStateToProps,
  null)(connectQuery({}, getQueries)(MessageList));
export default ConnectedMessageList;
