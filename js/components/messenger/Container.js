import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
// Libs
import Velocity from 'velocity-animate';
// App
import * as ViewModes from '../../constants/ViewModes';
import styles from '../../containers/Messenger.css';

export default class Container extends Component {
  componentDidMount() {
    const node = findDOMNode(this);
    const rightValue = window.getComputedStyle(node, null)
                              .getPropertyValue('right');
    this.initialRight = parseFloat(rightValue);
  }

  componentDidUpdate() {
    const { isCollapsed, viewMode, pageContentNode } = this.props;
    const finalRight = isCollapsed ? this.initialRight : 0;
    const domNode = findDOMNode(this);
    let finalWidth;
    Velocity(domNode, { right: finalRight }, 500);
    switch (viewMode) {
      case ViewModes.SPLIT:
        finalWidth = window.innerWidth;
        if (!isCollapsed) {
          finalWidth+= this.initialRight;
        }
        Velocity(pageContentNode, { width: finalWidth }, 500);
        break;
    }
  }

  render() {
    return (
      <div className={styles.sheet}>
        { this.props.children }
      </div>
    );
  }
};
