import React, { Component } from 'react';
import styles from './Header.css';

export default class Header extends Component {
  renderCloseButton() {
    return (
      <a className={styles.closeButton} href="#">
        <div className={styles.icon}></div>
      </a>
    );
  }

  render() {
    const { clientUser } = this.props;
    return (
      <div>
        <div className={styles.header}>
          { this.renderCloseButton() }
        </div>
        <div className={`${styles.header} ${styles.hide}`}>
          <div className={styles.description}>
            <img src={clientUser.avatar.url} className={styles.avatar}/>
            <div className={styles.body}>
              <div className={styles.name}>{clientUser.displayName}</div>
              <div className={styles.roleName}>{clientUser.roleName}</div>
            </div>
          </div>
          { this.renderCloseButton() }
        </div>
      </div>
    );
  };
};
