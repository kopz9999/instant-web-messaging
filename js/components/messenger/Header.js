import React, { Component } from 'react';
// App
import listItemStyles from './MessageListItem.css';
import Avatar from './message-list-item/Avatar';
import styles from './Header.css';

export default ({ user, text, extraContent }) => (
  <div className={styles.header}>
    <div className={listItemStyles.listItem}>
      <div className={listItemStyles.avatar}>
        <Avatar user={user} />
      </div>
      <div className={styles.content}>
        <p className={styles.text}>{text}</p>
      </div>
    </div>
    { extraContent }
  </div>
);
