import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import User from './utils/User';

/** @module WebMessenger */

/**
 * @param {DocumentFragment} parentNode
 * @param {Object} opts
 * @param {String} opts.appId
 * @param {Function} opts.challengeCallback
 * @param {VIEW_MODES} opts.viewMode
 * @param {DocumentFragment} opts.pageContentNode
 * @param {String} opts.welcomeMessage
 * @param {String} opts.messageNotification
 * @param {User} opts.clientUser
 * @param {User} opts.consumerUser
 * @return {App}
 * */
function createApp(parentNode, opts = {}) {
  return ReactDOM.render(
    <App
      {...opts}
    />,
    parentNode);
}

export { createApp, User };
// var webMessenger = new WebMessenger();
// module.exports = webMessenger;