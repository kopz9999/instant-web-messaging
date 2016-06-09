import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
// Lib
import Velocity from 'velocity-animate';
require('velocity-animate/velocity.ui');
// App
import Avatar from '../message-list-item/Avatar';
import listItemStyles from '../message-list-item/MessageListItem.css';
import styles from './TypingIndicator.css';

export default class TypingIndicator extends Component {
  get currentNode() {
    return findDOMNode(this);
  }

  constructor(props) {
    super(props);
    this.state = {
      isEntering: false,
      isHiding: false,
      isVisible: false,
      currentVisibleInterval: null,
    };
  }

  doEntrance() {
    const { requestScrollDown } = this.props;
    this.state.isEntering = true;
    requestScrollDown();
    Velocity(this.currentNode, 'transition.slideUpBigIn', { duration: 500 }).then(()=> {
      this.state.isEntering = false;
      this.state.isVisible = true;
      this.delayHide();
    });
  }

  verifyEntrance() {
    const { isVisible } = this.props;
    if (isVisible && !this.state.isVisible && !this.state.isEntering && !this.state.isHiding) {
      this.doEntrance();
    }
  }

  doHide() {
    this.state.isHiding = true;
    clearInterval(this.state.currentVisibleInterval);
    Velocity(this.currentNode, 'transition.slideDownBigOut', { duration: 500 }).then(()=> {
      this.state.isHiding = false;
      this.state.isVisible = false;
    });
  }

  verifyHiding() {
    const { isVisible } = this.props;
    if (!isVisible && !this.state.isEntering && !this.state.isHiding) {
      this.doHide();
    }
  }

  delayHide() {
    this.state.currentVisibleInterval =
      setInterval(()=> this.verifyHiding(), 500);
  }

  componentDidUpdate() {
    this.verifyEntrance();
  }

  componentDidMount() {
    this.verifyEntrance();
  }

  render() {
    const { user } = this.props;
    return (
      <div className={`${listItemStyles.listItem} ${styles.typingIndicator}`}>
        <div className={listItemStyles.avatar}>
          <Avatar user={user} />
        </div>
        <div className={listItemStyles.content}>
          <div className={styles.bounceAnimation}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    );
  }
}