import React, { Component, PropTypes } from 'react';
import styles from './Avatar.css';

export default class Avatar extends Component {
    render() {
      return (
        <div className={styles.avatar}>
          <img src={this.props.url} />
        </div>
      );
    }
};

Avatar.propTypes = {
  url: React.PropTypes.string
};