import React, { Component } from 'react';
import styles from './MessageMetadata.css';

/*
* TODO: Add i18n for words
* */
export default class MessageMetadata extends Component {
  renderReadState() {
    return (
      <div className={styles.readState}>Read</div>
    );
  }

  render() {
    const { isRead, timeAtText } = this.props;
    const readState = isRead ? this.renderReadState() : null;

    return (
      <div className={styles.metadataContainer}>
        <div className={styles.metadata}>
          <span>
            { timeAtText }
          </span>
        </div>
        { readState }
      </div>
    );
  }
}
