import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// App
import styles from './Messenger.css';
import Header from '../components/messenger/Header';
import MessageComposer from '../components/messenger/MessageComposer';
import ContentWrapper from '../components/messenger/ContentWrapper';
import * as ComposerActions from '../actions/ComposerActions';
import * as ConversationActions from '../actions/ConversationActions';

function mapDispatchToProps(dispatch) {
  return { 
    composerActions: bindActionCreators(ComposerActions, dispatch),
    conversationActions: bindActionCreators(ConversationActions, dispatch)
  };
}

class Messenger extends Component {
  render() {
    const {
      welcomeMessage,
      consumerUser,
      clientUser,
      conversation,
      composerActions,
      conversationActions
    } = this.props;
    const composerMessage = this.props.conversation.composerMessage;
    const {
      changeComposerMessage,
      submitComposerMessage,
    } = composerActions;

    return (
      <div className={styles.messenger}>
        <div className={styles.sheet}>
          <Header clientUser={clientUser} />
          <ContentWrapper
            welcomeMessage={welcomeMessage}
            clientUser={clientUser}
            consumerUser={consumerUser}
            conversation={conversation}
            onLoadMoreMessages={conversationActions.loadMoreMessages}
          />
          <MessageComposer
            value={composerMessage}
            onChange={changeComposerMessage}
            onSubmit={submitComposerMessage} />
        </div>
      </div>
    );
  };
};

const ConnectedMessenger =
  connect(null, mapDispatchToProps)(Messenger);
export default ConnectedMessenger;