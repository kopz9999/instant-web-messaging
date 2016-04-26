import React, { Component } from 'react';
import styles from './Launcher.css';
import Avatar from '../components/launcher/Avatar'
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  return {
    clientUser: state.Base.clientUser
  }
};

export default class Launcher extends Component {
  render() {
    console.log(this);
    return (
      <div className={styles.launcher}>
        <Avatar />
      </div>
    );
  };
}

// TODO: Use decorator
const ConnectedLauncher = connect(mapStateToProps)(Launcher);
export default ConnectedLauncher;