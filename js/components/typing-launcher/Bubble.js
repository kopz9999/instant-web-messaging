// React
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// Layer
import { connectTypingIndicator } from 'layer-react';
// App
import styles from './Bubble.css';
import icon from './images/chat-bubble.png'

class Button extends Component {
  render() {
    const { typing } = this.props;
    const typingStyle = typing.length > 0 ? styles.typing : '';
    const classes = `${styles.button} ${typingStyle}`;

    return (
      <div className={classes}>
        <img src={icon} />
        <div className={styles.dots}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
};

export default connectTypingIndicator()(Button);