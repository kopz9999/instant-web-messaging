import React, { Component } from 'react';
// App
import Container from '../components/messenger/Container';
import { ModalPortal } from 'react-modal-dialog';
import Messenger from './Messenger';
import ModalBackground from '../components/modal-messenger/ModalBackground';

export default class ModalMessenger extends Component {
  render() {
    const props = this.props;
    const { isCollapsed } = this.props.container;

    return (
      <ModalPortal>
        <ModalBackground isVisible={!isCollapsed}
                         backgroundColor="#ffffff"
                         zIndex={20001}>
          <Messenger { ...props } />
        </ModalBackground>
      </ModalPortal>
    );
  };
};
