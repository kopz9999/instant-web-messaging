import React, { Component } from 'react';
import listStyles from './MessagesList.css';
import typingStyles from './TypingIndicator.css';
import styles from './MessageListItem.css';

/*
 TODO: Remove !important and get multiple files in TypingIndicator
 */

export default class TypingIndicator extends Component {
  render() {
    const user = this.props.clientUser;
    return (
      <div className={`${typingStyles.typingIndicator} ${listStyles.list}`}>
        <div className={styles.listItem}>
          <div className={`${styles.message} ${styles.clientMessage}`}>
            <img src={user.avatar.url} className={`${typingStyles.avatar} ${styles.avatar}`}/>
            <div className={`${typingStyles.body} ${styles.body}`}>
              <div className={`${typingStyles.embedBody} ${typingStyles.blinkAnimation} ${styles.embedBody}`}>
                <p className={`${typingStyles.textPart} ${styles.textPart}`}>&bull;&bull;&bull;</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};