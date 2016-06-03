// React
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Libs
import Velocity from 'velocity-animate';
require('velocity-animate/velocity.ui');
// App
import * as NotificationActions from '../actions/NotificationActions';
import styles from './MessageNotification.css';
import * as StringFormat from '../utils/StringFormat';

const MAX_MESSAGE_SIZE = 29;
const NOTIFICATION_TIME = 5000;

const mapStateToProps = (state) => {
  return {
    notification: state.Notification,
  }
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(NotificationActions, dispatch),
  };
};

export default class MessageNotification extends Component {
  componentDidMount() {
    this.verifyDisplayNotification(false);
  }

  componentDidUpdate(prevProps, prevState) {
    this.verifyDisplayNotification(prevProps.notification.displayNotification);
  }

  displayNotification() {
    const domNode = findDOMNode(this);
    const { notification, actions } = this.props;
    const { displayNotification } = notification;
    const { hideMessageNotification } = actions;
    const effect = displayNotification ?
      'transition.slideDownBigIn' : 'transition.slideUpBigOut';
    Velocity(domNode, effect, { stagger: 75 });
    if (displayNotification) {
      setTimeout(hideMessageNotification, NOTIFICATION_TIME);
    }
  }

  verifyDisplayNotification(oldDisplayNotification) {
    const { notification, actions } = this.props;
    const { displayNotification, displayInitialMessage } = notification;
    const { hideMessageNotification } = actions;

    // Is different?
    if (displayNotification != oldDisplayNotification) {
      // Is requesting to show?
      if (displayNotification) {
        // It came from an update, so you must check ui
        if (this.shouldShowLastMessage()) {
          this.displayNotification();
        } else if (displayInitialMessage) {
          this.displayNotification();
        } else {
          hideMessageNotification(); //Announce you are not displaying anything
        }
      } else {
        this.displayNotification();
      }
    }
  }

  shouldShowLastMessage() {
    const { consumerUser, conversation } = this.props;
    const { lastMessage } = conversation;
    return (lastMessage && !lastMessage.isRead &&
      lastMessage.sender.userId != consumerUser.layerId &&
      lastMessage.parts.length > 0);
  }

  render() {
    const { clientUser, containerActions, conversation } = this.props;
    const { showContainer } = containerActions;
    const { lastMessage } = conversation;
    let messageNotification = this.props.messageNotification;

    if (this.shouldShowLastMessage()) {
      messageNotification = lastMessage.parts[0].body;
    }

    const displayMessageNotification =
      StringFormat.cutString(messageNotification, MAX_MESSAGE_SIZE, '...');

    return (
      <div className={styles.notification} onClick={showContainer}>
        <div className={styles.body}>
          <div className={styles.arrowUp}></div>
          <div className={styles.embedBody}>
            <p>
              <span className={styles.userName}>
                { clientUser.displayName }
              </span>
              <br/>
              <span className={styles.message}>
                { displayMessageNotification }
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageNotification);