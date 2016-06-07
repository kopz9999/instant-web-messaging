import React, { Component } from 'react';
import styles from './ReadFlag.css';

export default ({ isRead }) => (
  <span className={styles.readFlag}>
    { isRead ? 'Read' : 'Unread' }
  </span>
);
