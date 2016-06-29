// React
import React, {Component} from 'react';
// Libs
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
// App
import Avatar from '../messenger/message-list-item/Avatar';
import TextMessagePart from '../messenger/TextMessagePart';
import textPartStyles from './TextMessagePart.css';
import styles from './Dialog.css';

export default class Dialog extends Component {
  markMessageRead() {
    const { onMarkMessageRead, message } = this.props;
    if (message && message.isUnread) {
      onMarkMessageRead(message.id);
    }
  }

  renderCloseButton() {
    return (
      <div className={styles.buttonWrapper}>
        <div className={styles.button} onClick={this.handleClose.bind(this)}>
          <i className={styles.close}></i>
          <span>Close</span>
        </div>
      </div>
    );
  }

  displayMessenger() {
    window.location.href = "http://curaytor.com/chat?src=" + encodeURIComponent(window.location.href);
  }

  renderDialog() {
    const { message, senderUser } = this.props;
    const { displayName, avatarURL } = senderUser;
    const shortDisplayName = typeof(displayName) === 'string' ?
      displayName.split(' ')[0] : '';

    return (
      <div className={styles.message}>
        <div className={styles.avatarWrapper}>
          <div className={styles.avatar}>
            <img src={avatarURL} />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.username}> {shortDisplayName} </div>
          </div>
          <div className={styles.body}>
            {message.parts.map((messagePart) => {
              return (
                <TextMessagePart
                  styles={textPartStyles}
                  key={messagePart.id}
                  text={messagePart.body}/>
              )
            })}
          </div>
          <div className={styles.footer}>
            <div className={styles.replyButton} onClick={this.displayMessenger.bind(this)}>
              <i className={styles.reply}></i>
              <span>Reply to {shortDisplayName}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleClose() {
    this.markMessageRead();
  }

  render() {
    return (
      <div>
        <ModalContainer>
          <ModalDialog onClose={this.handleClose.bind(this)} className={styles.modalDialog}>
            { this.renderCloseButton() }
            { this.renderDialog() }
          </ModalDialog>
        </ModalContainer>
      </div>
    );
  }
}
