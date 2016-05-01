import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
// Libs
import Velocity from 'velocity-animate';
// App
import styles from '../../containers/Messenger.css';
// import ContainerManager from '../../utils/ContainerManager';

export default class Container extends Component {
  componentDidMount() {
    const node = findDOMNode(this);
    this.initialRight = window.getComputedStyle(node, null)
                              .getPropertyValue('right');
  }

  componentDidUpdate() {
    let finalRight = this.props.isCollapsed ? this.initialRight : 0;
    Velocity(findDOMNode(this), { right: finalRight }, 500);
  }

  render() {
    return (
      <div className={styles.sheet}>
        { this.props.children }
      </div>
    );
  }
};
