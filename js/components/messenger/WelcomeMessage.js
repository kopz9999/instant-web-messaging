import React, { Component } from 'react';
import listStyles from './MessagesList.css';
import styles from './MessageListItem.css';

export default ({ user, text }) => (
  <div className={listStyles.list}>
    <div className={styles.listItem}>
      <div className={`${styles.message} ${styles.clientMessage}`}>
        <img src={user.avatarURL} className={styles.avatar}/>
        <div className={styles.body}>
          <div className={styles.embedBody}>
            <p className={styles.textPart}>{text}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
