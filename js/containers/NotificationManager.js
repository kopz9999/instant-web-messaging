import React, {Component} from 'react';
import Dialog from '../components/modal-notification/Dialog';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state) => {
  return {
    notification: state.Notification,
  }
};

class NotificationManager extends Component {
  render() {
    const { clientUser, containerActions, conversation } = this.props;
    const { showContainer } = containerActions;
    const { lastMessage } = conversation;

    return lastMessage && (
      <Dialog
        senderUser={clientUser}
        message={lastMessage}
      />
    );
  }
}

export default connect(mapStateToProps)(NotificationManager);
