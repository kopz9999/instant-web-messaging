import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Layer
import { QueryBuilder } from 'layer-websdk';
// App
import * as ContainerActions from '../actions/ContainerActions';
import styles from './Wrapped.css';

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
  static propTypes = {
    extraComponent: React.PropTypes.element,
  };

  static defaultProps = {
    extraComponent: null
  };

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
    const { ready, extraComponent } = this.props;
    const childrenWithProps = ready ? this.getChildrenWithProps() : null;
    
    return (
      <div className={styles.wrapped}>
        {childrenWithProps}
        {extraComponent}
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MessengerProvider);
