import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
// Layer
import { QueryBuilder } from 'layer-sdk';
// App
import Profile from './Profile';
import WelcomeMessage from './WelcomeMessage';
import MessageList from './MessageList';
import TypingIndicator from './TypingIndicator';
import styles from './ContentWrapper.css';
// Utils
import throttledEventListener from '../../utils/throttledEventListener';

/*
* This component is created to handle scroll
*/
export default class ContentWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stickBottom: true
    };
  }

  componentDidMount() {
    this.removeScrollListener = throttledEventListener(findDOMNode(this),
      'scroll', this.handleScroll, this);
    this.removeHeaderScrollListener = throttledEventListener(findDOMNode(this),
      'scroll', this.handleHeaderScroll, this);

    this.removeResizeListener = throttledEventListener(window,
      'resize', this.handleScroll, this);
    this.scrollBottom();
  }

  componentWillUnmount() {
    this.removeResizeListener();
    this.removeScrollListener();
  }

  handleHeaderScroll() {
    var el = findDOMNode(this);
    const displayHeader = this.props.displayHeader;
    if (el.scrollTop > 180) {
      if (!displayHeader) {
        this.props.onScrollBelowHeader();
      }
    } else {
      if (displayHeader) {
        this.props.onScrollAboveHeader();
      }
    }
  }

  handleScroll() {
    var el = findDOMNode(this);
    if (el.scrollTop === 0) {
      this.props.onLoadMoreMessages();
    }

    const stickBottom = el.scrollHeight - 1 <= el.clientHeight + el.scrollTop;

    if (stickBottom !== this.state.stickBottom) {
      this.setState({ stickBottom });
    }

  }

  scrollBottom() {
    if (!this.state.isScrolling) {
      var el = findDOMNode(this);
      el.scrollTop = el.scrollHeight;
    }
  }

  requestScrollDown() {
    if (this.state.stickBottom) {
      this.scrollBottom();
    }
  }

  renderMessageList() {
    const { conversation, clientUser, consumerUser, isCollapsed,
      onMarkMessageRead } = this.props;
    return (
      <MessageList
        {
          ...({
            ...conversation,
            clientUser,
            consumerUser,
            isCollapsed,
            onMarkMessageRead,
            requestScrollDown: ()=> this.requestScrollDown()
          })
        }
      />
    );
  }

  renderTypingIndicator() {
    const { clientUser, conversation } = this.props;
    const { activeConversationId } = conversation;
    return (
      <TypingIndicator
        clientUser={clientUser}
        conversationId={activeConversationId}
        onDisplay={this.requestScrollDown.bind(this)}
      />
    );
  }

  render() {
    const { welcomeMessage, clientUser, conversation } = this.props;
    const { activeConversationId } = conversation;
    const messageListReady = activeConversationId != null;
    const messageList = messageListReady ? this.renderMessageList() : null;
    const typingIndicator = messageListReady ?
      this.renderTypingIndicator() : null;

    return (
      <div className={styles.content}>
        <Profile clientUser={clientUser}/>
        <div className={styles.listContainer}>
          <WelcomeMessage
            user={clientUser}
            text={welcomeMessage}
          />
          { messageList }
          { typingIndicator }
        </div>
      </div>
    );
  }
}
