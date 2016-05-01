import React, { Component } from 'react';
import { connectTypingIndicator } from 'layer-react';
import listStyles from './MessagesList.css';
import typingStyles from './TypingIndicator.css';
import styles from './MessageListItem.css';

/*
 TODO: Remove !important and get multiple files in TypingIndicator
 */

class TypingIndicator extends Component {
  doScroll() {
    if (this.shouldDisplay()) this.props.onDisplay();
  }

  componentDidUpdate() {
    this.doScroll();
  }
  componentDidMount() {
    this.doScroll();
  }

  shouldDisplay() {
    return this.props.typing.includes(this.props.clientUser.layerId);
  }

  render() {
    const user = this.props.clientUser;
    const displayStyle = this.shouldDisplay() ? '' : typingStyles.hide;
    const wrapperStyle =
      `${typingStyles.typingIndicator} ${listStyles.list} ${displayStyle}`;
    return (
      <div className={wrapperStyle}>
        <div className={styles.listItem}>
          <div className={`${styles.message} ${styles.clientMessage}`}>
            <img src={user.avatar.url} className={`${typingStyles.avatar} ${styles.avatar}`}/>
            <div className={`${typingStyles.body} ${styles.body}`}>
              <div className={`${typingStyles.embedBody} ${typingStyles.blinkAnimation} ${styles.embedBody}`}>
                <p className={`${typingStyles.textPart} ${styles.textPart}`}>&bull;&bull;&bull;</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

const ConnectedTypingIndicator =
  connectTypingIndicator()(TypingIndicator);
export default ConnectedTypingIndicator;
