import React, { Component } from 'react';
import listStyles from './MessagesList.css';
import listItemStyles from './MessageListItem.css';
import styles from './Header.css';
import Avatar from './message-list-item/Avatar';

export default ({ user, text, extraContent }) => (
  <div className={listStyles.list}>
    <div className={listItemStyles.listItem}>
      <div className={listItemStyles.avatar}>
        <Avatar user={user} />
      </div>
      <div className={listItemStyles.content}>
        <p className={styles.header}>{text}</p>
      </div>
      { extraContent }
    </div>
  </div>
);