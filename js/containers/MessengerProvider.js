import React, { Component } from 'react';
import { connect } from 'react-redux';
// Layer
import { QueryBuilder } from 'layer-sdk';

const mapStateToProps = (state) => {
  return {
    clientUser: state.App.clientUser,
    consumerUser: state.App.consumerUser,
    ready: state.App.ready,
    conversation: state.Conversation,
    container: state.Container,
  }
};

class MessengerProvider extends Component {
  getChildrenWithProps() {
    const { clientUser, consumerUser, conversation, container,
      composerActions } = this.props;
    return React.Children.map(this.props.children,
      (child) => React.cloneElement(child, {
        clientUser,
        consumerUser,
        conversation,
        container,
        composerActions
      }))
  }

  render() {
    const { ready } = this.props;
    const childrenWithProps = ready ? this.getChildrenWithProps() : null;
    return (
      <div>
        {childrenWithProps}
      </div>
    );
  }
};

const ConnectedMessengerProvider =
  connect(mapStateToProps)(MessengerProvider);
export default ConnectedMessengerProvider;
