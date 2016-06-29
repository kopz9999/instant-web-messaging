import React, { Component } from 'react';
// App
import styles from './CloseButton.css';

export default ({ to, onClick }) => (
  <a className={styles.closeButton} href={to} onClick={onClick}>
    <i className={styles.icon}></i>
    Close chat
  </a>
);
