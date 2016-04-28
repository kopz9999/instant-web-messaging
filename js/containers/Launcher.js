import React, { Component } from 'react';
import styles from './Launcher.css';
import Avatar from '../components/launcher/Avatar';
import Notification from '../components/launcher/Notification';

/*
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  return {
    clientUser: state.Base.clientUser
  }
};
*/

export default class Launcher extends Component {
  render() {
    const { clientUser } = this.props;
    return (
      <div className={styles.launcher}>
        <Avatar url={clientUser.avatar.url} />
        <Notification count={1} />
      </div>
    );
  };
}

/*
// TODO: Use decorator
const ConnectedLauncher = connect(mapStateToProps)(Launcher);
export default ConnectedLauncher;
*/