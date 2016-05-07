import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import User from './utils/User';
import VIEW_MODES from './constants/ViewModes';

/** @module WebMessenger */

/**
 * @param {DocumentFragment} targetNode Where the component will be rendered
 * @param {Object} opts Application parameters
 * @param {String} opts.appId Layer Application Id
 * @param {Function} opts.challengeCallback Layer Authentication callback
 * The one who should be authenticated is consumerUser
 * @param {VIEW_MODES} opts.viewMode Enumeration to specify how to display
 * the app
 * @param {DocumentFragment} opts.pageContentNode In case of specifying
 * SPLIT mode, this should be the container where the rest of page relies
 * @param {String} opts.welcomeMessage Welcome message from the admin
 * @param {String} opts.messageNotification Initial message notification from
 * the top
 * @param {User} opts.clientUser Admin User on the backend
 * @param {User} opts.consumerUser User who is viewing your app
 * @return {App}
 * */
function createApp(targetNode, opts = {}) {
  return ReactDOM.render(
    <App
      {...opts}
    />,
    targetNode);
}

export { createApp, User, VIEW_MODES };
