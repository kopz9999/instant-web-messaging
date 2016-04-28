import React, { Component, PropTypes } from 'react';
import styles from './Notification.css';

export default class Notification extends Component {
  render() {
    const { count } = this.props;
    return (
      <div className={styles.notification}>
        <div className={styles.number}>
          { count }
        </div>
      </div>
    );
  }
};

Notification.propTypes = {
  count: React.PropTypes.number
};