import React, {Component} from 'react';
import Dialog from '../components/modal-notification/Dialog';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const mapStateToProps = ({Notification: notification, LayerUsers: layerUsers}) => {
  return {
    notification,
    layerUsers
  }
};

class NotificationManager extends Component {
  shouldShowLastMessage() {
    const { consumerUser, conversation } = this.props;
    const { lastMessage } = conversation;
    return (lastMessage && !lastMessage.isRead &&
    lastMessage.sender.userId != consumerUser.layerId &&
    lastMessage.parts.length > 0);
  }

  render() {
    const { containerActions, conversation, layerUsers } = this.props;
    const { showContainer } = containerActions;
    const { lastMessage } = conversation;
    let senderUser = this.shouldShowLastMessage() ?
      layerUsers[lastMessage.sender.userId] : null;
    return senderUser && (
      <Dialog
        senderUser={senderUser}
        message={lastMessage}
      />
    );
  }
}

export default connect(mapStateToProps)(NotificationManager);