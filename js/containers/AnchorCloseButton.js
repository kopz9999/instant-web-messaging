import React, { Component } from 'react';
// App
import styles from './CloseButton.css';

export default ({ to }) => (
  <a className={styles.closeButton} href={to}>
    <i className={styles.icon}></i>
    Close chat
  </a>
);
