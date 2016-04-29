import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// App
import styles from './Messenger.css';
import Header from '../components/messenger/Header';
import Profile from '../components/messenger/Profile';
import WelcomeMessage from '../components/messenger/WelcomeMessage';
import MessageList from '../components/messenger/MessageList';
import TypingIndicator from '../components/messenger/TypingIndicator';
import MessageComposer from '../components/messenger/MessageComposer';
import * as ComposerActions from '../actions/ComposerActions';

function mapDispatchToProps(dispatch) {
  return { composerActions: bindActionCreators(ComposerActions, dispatch) };
}

class Messenger extends Component {
  renderMessageList() {
    const { clientUser, conversation, consumerUser } = this.props;
    return (
      <MessageList
        {
          ...({
            ...conversation,
            clientUser,
            consumerUser
          })
        }
      />
    );
  }

  render() {
    const { clientUser, welcomeMessage, conversation,
      composerActions } = this.props;
    const composerMessage = this.props.conversation.composerMessage;
    const messageListReady = conversation.activeConversationId != null;
    const messageList = messageListReady ? this.renderMessageList() : null;
    const {
      changeComposerMessage,
      submitComposerMessage,
    } = composerActions;

    return (
      <div className={styles.messenger}>
        <div className={styles.sheet}>
          <Header clientUser={clientUser} />
          <div className={styles.content}>
            <Profile clientUser={clientUser}/>
            <div className={styles.listContainer}>
              <WelcomeMessage
                user={clientUser}
                text={welcomeMessage}
              />
              { messageList }
              <TypingIndicator
                clientUser={clientUser}
              />
            </div>
          </div>
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