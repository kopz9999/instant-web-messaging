import React, { Component } from 'react';
import styles from './MessageListItem.css';

export default ({ displayUserName, messagePart }) => (
  <p className={styles.textPart}>
    <span className={styles.userName}>{displayUserName}:</span>
    <br/>
    {messagePart.body}
  </p>
);
