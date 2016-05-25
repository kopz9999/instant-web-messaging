import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// App
import * as ContainerActions from '../actions/ContainerActions';
// App
import styles from './CloseButton.css';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContainerActions, dispatch),
  };
}

class CloseButton extends Component {
  render() {
    const { actions } = this.props;
    const { hideContainer } = actions;

    return (
      <div onClick={hideContainer}
           className={styles.icon}>
      </div>
    );
  };
}

export default connect(null, mapDispatchToProps)(CloseButton);