import React, { Component } from 'react';
import styles from './MessageListItem.css';
import TextMessagePart from './TextMessagePart';
import ReadFlag from './message-list-item/ReadFlag';
import Timestamp from './message-list-item/Timestamp';
import Avatar from './message-list-item/Avatar';
import { timeSinceCompose } from '../../utils/FormatHelper';

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
    const { message, consumerUser, senderUser } = this.props;
    const isConsumerMessage = senderUser == consumerUser;
    const displayUserName = isConsumerMessage ? 'You' : senderUser.displayName;
    const timeAtText = timeSinceCompose(message.sentAt);
    const displayReadFlag = message.isRead && !isConsumerMessage;
    const readFlag = displayReadFlag ?
      <ReadFlag isRead={message.isRead} /> : null;

    return (
      <div className={styles.listItem}>
        <div className={styles.avatar}>
          <Avatar user={senderUser} />
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.username}> {displayUserName} </div>
            <Timestamp timeAtText={timeAtText} />
          </div>
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
          <div className={styles.footer}>
            { readFlag }
          </div>
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
