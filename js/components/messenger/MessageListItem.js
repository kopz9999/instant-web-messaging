import React, { Component } from 'react';
import styles from './MessageListItem.css';
import TextMessagePart from './TextMessagePart';
import MessageMetadata from './MessageMetadata';
import { formatTimestamp } from '../../utils/FormatHelper';

export default class MessageListItem extends Component {
  componentDidMount() {
    this.markMessageRead();
  }

  componentWillReceiveProps() {
    this.markMessageRead();
  }

  markMessageRead() {
    const { onMarkMessageRead, message, canMarkRead } = this.props;
    if (message.isUnread && canMarkRead) {
      onMarkMessageRead(message.id);
    }
  }

  render() {
    const { message, clientUser, consumerUser } = this.props;
    const isClientMessage = message.sender.userId == clientUser.layerId;
    const messageStyle = isClientMessage ?
      styles.clientMessage : styles.consumerMessage;
    const avatarURL = isClientMessage ?
      clientUser.avatarURL : consumerUser.avatarURL;
    const displayUserName = isClientMessage ?
      clientUser.displayName : consumerUser.displayName;
    const timeAtText = formatTimestamp(message.sentAt);
    const displayReadFlag = message.isRead && !isClientMessage;

    return (
      <div className={styles.listItem}>
        <div className={`${styles.message} ${messageStyle}`}>
          <img src={avatarURL} className={styles.avatar}/>
          <div className={styles.body}>
            <div className={styles.embedBody}>
              {message.parts.map((messagePart) => {
                return (
                  <TextMessagePart
                    key={messagePart.id}
                    displayUserName={displayUserName}
                    messagePart={messagePart}/>
                )
              })}
            </div>
          </div>
          <MessageMetadata
            timeAtText={timeAtText}
            isRead={displayReadFlag}
          />
        </div>
      </div>
    );
  };
};

MessageListItem.propTypes = {
  message: React.PropTypes.object,
  clientUser: React.PropTypes.object,
  consumerUser: React.PropTypes.object,
};
