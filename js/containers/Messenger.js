import React, { Component } from 'react';
import styles from './Messenger.css';
import Header from '../components/messenger/Header';
import Profile from '../components/messenger/Profile';
import WelcomeMessage from '../components/messenger/WelcomeMessage';
import MessageList from '../components/messenger/MessageList';
import TypingIndicator from '../components/messenger/TypingIndicator';
import MessageComposer from '../components/messenger/MessageComposer';

export default class Messenger extends Component {
  render() {
    const { clientUser, welcomeMessage } = this.props;

    return (
      <div className={styles.messenger}>
        <div className={styles.sheet}>
          <Header clientUser={clientUser} />
          <div className={styles.content}>
            <Profile clientUser={clientUser}/>
            <div className={styles.listContainer}>
              <WelcomeMessage
                user={clientUser}
                text={welcomeMessage}
              />
              <MessageList
                clientUser={clientUser}
              />
              <TypingIndicator
                clientUser={clientUser}
              />
            </div>
          </div>
          <MessageComposer />
        </div>
      </div>
    );
  };
};
