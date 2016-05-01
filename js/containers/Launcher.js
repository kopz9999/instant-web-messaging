import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// App
import styles from './Launcher.css';
import Avatar from '../components/launcher/Avatar';
import Notification from '../components/launcher/Notification';
import * as ContainerActions from '../actions/ContainerActions';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContainerActions, dispatch),
  };
}

export default class Launcher extends Component {
  renderNotification(){
    const { clientUser, conversation } = this.props;
    return (
      <Notification
        {
          ...({
            ...conversation,
            clientUser
          })
        }
      />
    );
  }

  render() {
    const { clientUser, conversation, actions } = this.props;
    const messageReady = conversation.activeConversationId != null;
    const notification = messageReady ? this.renderNotification() : null;

    return (
      <div className={styles.launcher} onClick={actions.showContainer}>
        <Avatar url={clientUser.avatar.url} />
        { notification }
      </div>
    );
  };
}

export default connect(null, mapDispatchToProps)(Launcher);
