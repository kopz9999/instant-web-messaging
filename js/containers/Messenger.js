import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// App
import styles from './Messenger.css';
import DetailedHeader from '../components/messenger/DetailedHeader';
import MessageComposer from '../components/messenger/MessageComposer';
import ContentWrapper from '../components/messenger/ContentWrapper';
import Container from '../components/messenger/Container';
import * as ComposerActions from '../actions/ComposerActions';
import * as ConversationActions from '../actions/ConversationActions';

function mapDispatchToProps(dispatch) {
  return {
    composerActions: bindActionCreators(ComposerActions, dispatch),
    conversationActions: bindActionCreators(ConversationActions, dispatch),
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
      container,
    } = this.props;
    const composerMessage = this.props.conversation.composerMessage;
    const { displayHeader, isCollapsed } = container;
    const {
      changeComposerMessage,
      submitComposerMessage,
    } = composerActions;
    const {
      showHeader,
      hideHeader
    } = containerActions;
    const { loadMoreMessages, markMessageRead } = conversationActions;

    return (
      <div className={styles.messenger}>
        <Container { ...container }>
          <DetailedHeader
            clientUser={clientUser}
            displayHeader={displayHeader}
          />
          <ContentWrapper
            welcomeMessage={welcomeMessage}
            clientUser={clientUser}
            consumerUser={consumerUser}
            conversation={conversation}
            onLoadMoreMessages={loadMoreMessages}
            onMarkMessageRead={markMessageRead}
            displayHeader={displayHeader}
            isCollapsed={isCollapsed}
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
