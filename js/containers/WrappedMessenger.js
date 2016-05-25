import React, { Component } from 'react';
// App
import Container from '../components/messenger/Container';
import Messenger from './Messenger';

export default class WrappedMessenger extends Component {
  render() {
    const props = this.props;
    const { container } = props;

    return (
      <Container { ...container }>
        <Messenger { ...props } />
      </Container>
    );
  };
};
