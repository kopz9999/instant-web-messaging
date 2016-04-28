import React, { Component } from 'react';
import styles from './MessageComposer.css';

export default class MessageComposer extends Component {
  render() {
    return (
      <div className={styles.composerContainer}>
        <form className={styles.composer}>
          <div className={styles.textAreaContainer}>
            <div className={styles.textArea}>
              <pre><span></span><br/></pre>
              <textarea placeholder="Ask anything..."></textarea>
            </div>
            <img className={styles.submitButton} src="./demo/button.png"/>
          </div>
        </form>
      </div>
    );
  };
};
