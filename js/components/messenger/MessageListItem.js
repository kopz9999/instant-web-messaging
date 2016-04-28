import React, { Component } from 'react';
import styles from './MessageListItem.css';
import TextMessagePart from './TextMessagePart';

export default class MessageListItem extends Component {
  render() {
    const { message, clientUser, customerUser } = this.props;
    const isClientMessage = message.sender.userId == clientUser.layerId;
    const messageStyle = isClientMessage ?
      styles.clientMessage : styles.customerMessage;
    const avatarURL = isClientMessage ?
      clientUser.avatar.url : customerUser.avatar.url;
    const displayUserName = isClientMessage ?
      clientUser.displayName : customerUser.displayName;

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
        </div>
      </div>
    );
  };
};

MessageListItem.propTypes = {
  message: React.PropTypes.object,
  clientUser: React.PropTypes.object,
  customerUser: React.PropTypes.object,
};
