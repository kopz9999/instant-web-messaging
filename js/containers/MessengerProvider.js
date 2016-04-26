import React, { Component } from 'react';
import {connect} from 'react-redux';

export default class MessengerProvider extends Component {
  constructor(props) {
    super(props);
    const { clientUser } = this.props;
    this.props.dispatch({ clientUser: clientUser, type: 'CLIENT_USER_SETUP' });
  }

  render() {
    return this.props.children;
  }
};

// TODO: Use decorator
const ConnectedMessengerProvider = connect()(MessengerProvider);
export default ConnectedMessengerProvider;