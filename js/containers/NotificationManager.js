import React, {Component} from 'react';
import Dialog from '../components/modal-notification/Dialog';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ConversationActions from '../actions/ConversationActions';
import * as ContainerActions from '../actions/ContainerActions';

const mapStateToProps = ({Notification: notification, LayerUsers: layerUsers}) => {
  return {
    notification,
    layerUsers
  }
};

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(ConversationActions, dispatch),
    containerActions: bindActionCreators(ContainerActions, dispatch),
  };
}

class NotificationManager extends Component {
  shouldShowLastMessage() {
    const { consumerUser, conversation } = this.props;
    const { lastMessage } = conversation;
    return (lastMessage && !lastMessage.isRead &&
    lastMessage.sender.userId != consumerUser.layerId &&
    lastMessage.parts.length > 0);
  }

  onMarkMessageRead(messageId) {
    this.props.markMessageRead(messageId);
    this.setState({}); // Trigger update to force re-render
  }

  render() {
    const { containerActions, conversation, layerUsers } = this.props;
    const { showContainer } = containerActions;
    const { lastMessage } = conversation;
    let senderUser = this.shouldShowLastMessage() ?
      layerUsers[lastMessage.sender.userId] : null;
    return senderUser && (
      <Dialog
        onReply={showContainer}
        onMarkMessageRead={this.onMarkMessageRead.bind(this)}
        senderUser={senderUser}
        message={lastMessage}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationManager);
