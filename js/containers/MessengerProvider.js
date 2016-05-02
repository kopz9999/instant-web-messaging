import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Layer
import { QueryBuilder } from 'layer-sdk';
// App
import * as ContainerActions from '../actions/ContainerActions';

const mapStateToProps = (state) => {
  return {
    clientUser: state.App.clientUser,
    consumerUser: state.App.consumerUser,
    ready: state.App.ready,
    conversation: state.Conversation,
    container: state.Container,
  }
};

function mapDispatchToProps(dispatch) {
  return {
    containerActions: bindActionCreators(ContainerActions, dispatch),
  };
};

class MessengerProvider extends Component {
  getChildrenWithProps() {
    const { clientUser, consumerUser, conversation, container,
      containerActions } = this.props;
    return React.Children.map(this.props.children,
      (child) => React.cloneElement(child, {
        clientUser,
        consumerUser,
        conversation,
        container,
        containerActions
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

export default connect(mapStateToProps, mapDispatchToProps)(MessengerProvider);
