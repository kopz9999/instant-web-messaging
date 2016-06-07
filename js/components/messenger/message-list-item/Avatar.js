import React, { Component } from 'react';
import styles from './Avatar.css';
import defaultAvatar from './images/default.png';

/*
 * TODO: Add i18n for words
 * */
export default class Avatar extends Component {
  get user() {
    return this.props.user;
  }

  renderImage(avatarURL) {
    return (
      <div className={styles.avatar}>
        <img src={avatarURL} />
      </div>
    );
  }

  renderDefault() {
    const { color } = this.user;
    const inlineStyles = {
      backgroundColor: color,
      borderColor: color
    };
    return (
      <div className={`${styles.avatar} ${styles.default}`} style={inlineStyles}>
        <img src={defaultAvatar} />
      </div>
    );
  }

  render() {
    const { avatarURL } = this.user;
    return avatarURL ?
      this.renderImage(avatarURL) : this.renderDefault();
  }
}
