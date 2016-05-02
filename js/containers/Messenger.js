import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// App
import styles from './Messenger.css';
import Header from '../components/messenger/Header';
import MessageComposer from '../components/messenger/MessageComposer';
import ContentWrapper from '../components/messenger/ContentWrapper';
import Container from '../components/messenger/Container';
import * as ComposerActions from '../actions/ComposerActions';
import * as ConversationActions from '../actions/ConversationActions';
import * as ContainerActions from '../actions/ContainerActions';

function mapDispatchToProps(dispatch) {
  return {
    composerActions: bindActionCreators(ComposerActions, dispatch),
    conversationActions: bindActionCreators(ConversationActions, dispatch),
    containerActions: bindActionCreators(ContainerActions, dispatch),
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
      conversationActions,
      containerActions,
      container
    } = this.props;
    const composerMessage = this.props.conversation.composerMessage;
    const { displayHeader } = container;
    const {
      changeComposerMessage,
      submitComposerMessage,
    } = composerActions;
    const {
      showHeader,
      hideHeader
    } = containerActions;

    return (
      <div className={styles.messenger}>
        <Container { ...container }>
          <Header
            clientUser={clientUser}
            displayHeader={displayHeader}
          />
          <ContentWrapper
            welcomeMessage={welcomeMessage}
            clientUser={clientUser}
            consumerUser={consumerUser}
            conversation={conversation}
            onLoadMoreMessages={conversationActions.loadMoreMessages}
            displayHeader={displayHeader}
            onScrollBelowHeader={showHeader}
            onScrollAboveHeader={hideHeader}
          />
          <MessageComposer
            value={composerMessage}
            onChange={changeComposerMessage}
            onSubmit={submitComposerMessage} />
        </Container>
      </div>
    );
  };
};

export default connect(null, mapDispatchToProps)(Messenger);
