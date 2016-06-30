import React, { Component } from 'react';
import listStyles from './MessagesList.css';
import listItemStyles from './message-list-item/MessageListItem.css';

export default ({ user, text, extraContent }) => (
  <div className={listStyles.list}>
    <div className={listItemStyles.listItem}>
      { extraContent }
    </div>
  </div>
);