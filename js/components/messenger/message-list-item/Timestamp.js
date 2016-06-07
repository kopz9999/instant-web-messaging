import React, { Component } from 'react';
import styles from './Timestamp.css';

export default ({ timeAtText }) => (
  <span className={styles.timestamp}>
    { timeAtText }
  </span>
);
