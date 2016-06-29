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
  constructor(props) {
    super(props);
    this.state = {
      isShowingModal: true,
    };
  }

  componentDidMount() {
    // this.markMessageRead();
  }

  renderCloseButton() {
    return (
      <div className={styles.buttonWrapper}>
        <div className={styles.button}>
          <i className={styles.close}></i>
          <span>Close</span>
        </div>
      </div>
    );
  }

  renderDialog() {
    const { message, senderUser } = this.props;
    const { displayName, avatarURL } = senderUser;

    return (
      <div className={styles.message}>
        <div className={styles.avatarWrapper}>
          <div className={styles.avatar}>
            <img src={avatarURL} />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.username}> {displayName} </div>
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
            <div className={styles.replyButton}>
              <i className={styles.reply}></i>
              <span>Reply to {displayName}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {
          this.state.isShowingModal &&
          <ModalContainer>
            <ModalDialog>
              { this.renderCloseButton() }
              { this.renderDialog() }
            </ModalDialog>
          </ModalContainer>
        }
      </div>
    );
  }
}
