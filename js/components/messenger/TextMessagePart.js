import React, { Component } from 'react';
import styles from './TextMessagePart.css';

export default ({ messagePart }) => (
  <p className={styles.textPart}>
    {messagePart.body}
  </p>
);
