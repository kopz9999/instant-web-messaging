import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// App
import Header from '../components/messenger/Header';
import AnchorCloseButton from './AnchorCloseButton';
import MessageComposer from '../components/messenger/MessageComposer';
import ContentWrapper from '../components/messenger/ContentWrapper';
import * as ComposerActions from '../actions/ComposerActions';
import * as ConversationActions from '../actions/ConversationActions';
import * as VIEW_MODES from '../constants/ViewModes';
import styles from './Wrapped.css';

function mapDispatchToProps(dispatch) {
  return {
    composerActions: bindActionCreators(ComposerActions, dispatch),
    conversationActions: bindActionCreators(ConversationActions, dispatch),
  };
}

class Messenger extends Component {
  renderCloseButton() {
    const { closeRoute, container } = this.props;
    if (container.viewMode == VIEW_MODES.FULL_SCREEN) {
      return (
        <div className={styles.closeButton}>
          <AnchorCloseButton to={closeRoute} />
        </div>
      );
    } else {
      return null;
    }
  }

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
    const composerMessage = conversation.composerMessage;
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
      <div className={styles.wrapped}>
        <Header
          user={clientUser}
          text={clientUser.displayName}
          extraContent={this.renderCloseButton()}
        />
        <ContentWrapper
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
      </div>
    );
  };
};

export default connect(null, mapDispatchToProps)(Messenger);

