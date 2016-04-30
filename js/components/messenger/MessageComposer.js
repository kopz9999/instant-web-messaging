import React, { Component } from 'react';
import styles from './MessageComposer.css';
import submitButtonIcon from './images/button.png';

const ENTER = 13;

export default class MessageComposer extends Component {
  handleChange = (event) => {
    this.props.onChange(event.target.value);
  };

  handleKeyDown = (event) => {
    if (event.keyCode === ENTER && !event.shiftKey) {
      event.preventDefault();
      this.verifySendMessage();
    }
  };

  verifySendMessage() {
    if (this.props.value.length) {
      this.props.onSubmit();
    }
  }

  render() {
    return (
      <div className={styles.composerContainer}>
        <form className={styles.composer}>
          <div className={styles.textAreaContainer}>
            <div className={styles.textArea}>
              <pre><span></span><br/></pre>
              <textarea
                value={this.props.value}
                onKeyDown={this.handleKeyDown}
                onChange={this.handleChange}
                placeholder="Ask anything..."
              />
            </div>
            <img
              onClick={this.verifySendMessage.bind(this)}
              className={styles.submitButton}
              src={submitButtonIcon}
            />
          </div>
        </form>
      </div>
    );
  };
};
