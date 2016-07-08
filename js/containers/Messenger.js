import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { findDOMNode } from 'react-dom';
// App
import AnchorCloseButton from './AnchorCloseButton';
import MessageComposer from '../components/messenger/MessageComposer';
import ContentWrapper from '../components/messenger/ContentWrapper';
import BlankMessagesList from './../components/messenger/BlankMessagesList';
import * as ComposerActions from '../actions/ComposerActions';
import * as ConversationActions from '../actions/ConversationActions';
import * as VIEW_MODES from '../constants/ViewModes';
import styles from './Wrapped.css';
// Utils
import throttledEventListener from '../utils/throttledEventListener';

function mapDispatchToProps(dispatch) {
  return {
    composerActions: bindActionCreators(ComposerActions, dispatch),
    conversationActions: bindActionCreators(ConversationActions, dispatch),
  };
}

class Messenger extends Component {
  get scrollNode() {
    const { container } = this.props;
    switch (container.viewMode) {
      case VIEW_MODES.MODAL:
        return findDOMNode(this).parentNode;
      default:
        return this.props.messengerElement;
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      stickBottom: true
    };
  }

  componentDidMount() {
    this.removeScrollListener = throttledEventListener(this.scrollNode,
      'scroll', this.handleScroll, this);

    this.removeResizeListener = throttledEventListener(window,
      'resize', this.handleScroll, this);
    this.scrollBottom();
  }

  componentWillUnmount() {
    this.removeResizeListener();
    this.removeScrollListener();
  }

  handleScroll() {
    const { loadMoreMessages } = this.props.conversationActions;
    var el = this.scrollNode;
    if (el.scrollTop === 0) {
      loadMoreMessages();
    }

    const stickBottom = el.scrollHeight - 1 <= el.clientHeight + el.scrollTop;

    if (stickBottom !== this.state.stickBottom) {
      this.setState({ stickBottom });
    }

  }
  scrollBottom() {
    if (!this.state.isScrolling) {
      var el = this.scrollNode;
      el.scrollTop = el.scrollHeight;
    }
  }

  requestScrollDown() {
    if (this.state.stickBottom) {
      setTimeout( ()=> {
        this.scrollBottom();
      }, 100);
    }
  }

  renderCloseButton() {
    const { closeRoute, container, containerActions } = this.props;
    switch (container.viewMode) {
      case VIEW_MODES.FULL_SCREEN:
        return (
          <div className={styles.closeButton}>
            <AnchorCloseButton to={closeRoute} />
          </div>
        );
      case VIEW_MODES.MODAL:
        return (
          <div className={styles.closeButtonModal}>
            <AnchorCloseButton onClick={containerActions.hideContainer} />
          </div>
        );
      default:
        return null;
    }
  }

  renderBlankMessagesList() {
    const { clientUser, welcomeMessage } = this.props;
    return (
      <BlankMessagesList
        clientUser={clientUser}
        defaultMessage={welcomeMessage}
      />
    );
  }

  render() {
    const {
      consumerUser,
      clientUser,
      conversation,
      composerActions,
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
    const { markMessageRead } = this.props.conversationActions;

    return (
      <div className={styles.wrapped}>
        <ContentWrapper
          requestScrollDown={this.requestScrollDown.bind(this)}
          clientUser={clientUser}
          consumerUser={consumerUser}
          conversation={conversation}
          onMarkMessageRead={markMessageRead}
          displayHeader={displayHeader}
          isCollapsed={isCollapsed}
          onScrollBelowHeader={showHeader}
          onScrollAboveHeader={hideHeader}
          closeButton={this.renderCloseButton()}
          blankMessagesList={this.renderBlankMessagesList()}
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

