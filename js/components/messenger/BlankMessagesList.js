import React, { Component } from 'react';
import styles from './BlankMessagesList.css';

export default class BlankMessagesList extends Component {
  static propTypes = {
    clientUser: React.PropTypes.object,
    defaultMessage: React.PropTypes.string,
  };

  renderDefaultMessage() {
    const { clientUser, defaultMessage } = this.props;
    const { displayName, avatarURL } = clientUser;
    let shortDisplayName = typeof(displayName) === 'string' ?
      displayName.split(' ')[0] : '';
    if (clientUser.roleName) shortDisplayName += `, ${clientUser.roleName}`;

    return (
      <div className={styles.defaultMessage}>
        <div className={styles.avatarWrapper}>
          <div className={styles.avatar}>
            <img src={avatarURL} />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
              <div className={styles.username}> {shortDisplayName} </div>
          </div>
          <div className={styles.body}>
            {defaultMessage}
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={styles.blankMessageList}>
        { this.renderDefaultMessage() }
      </div>
    );
  }
}