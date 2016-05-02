import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
// Libs
import Velocity from 'velocity-animate';
require('velocity-animate/velocity.ui');
// App
import styles from './Header.css';

export default class DetailedHeader extends Component {
  componentDidUpdate() {
    const { displayHeader } = this.props;
    const domNode = findDOMNode(this);
    const effect = displayHeader ?
      'transition.slideDownBigIn' : 'transition.slideUpBigOut';

    Velocity(domNode, effect, { stagger: 75 });
  }

  render() {
    const { clientUser, renderCloseButton } = this.props;

    return (
      <div className={`${styles.header} ${styles.hide}`}>
        <div className={styles.description}>
          <img src={clientUser.avatar.url} className={styles.avatar}/>
          <div className={styles.body}>
            <div className={styles.name}>{clientUser.displayName}</div>
            <div className={styles.role}>{clientUser.roleName}</div>
          </div>
        </div>
        { renderCloseButton() }
      </div>
    );
  }
}
