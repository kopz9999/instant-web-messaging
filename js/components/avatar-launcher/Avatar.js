import React, { Component, PropTypes } from 'react';
import styles from './Avatar.css';

export default class Avatar extends Component {
  static propTypes = {
    url: React.PropTypes.string
  };

  render() {
    return (
      <div className={styles.avatar}>
        <img src={this.props.url} />
      </div>
    );
  }
};
