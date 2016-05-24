import User from './utils/User';
import Messenger from './utils/Messenger';
import VIEW_MODES from './constants/ViewModes';
import {
  SHOW_CONTAINER,
  HIDE_CONTAINER,
  MESSENGER_SHEET_RENDERED
} from './constants/ActionTypes';

const EVENT_ACTIONS = {
  SHOW_CONTAINER, HIDE_CONTAINER, MESSENGER_SHEET_RENDERED
};

/** @module WebMessenger */

/**
 * @param {Object} opts Application parameters
 * @param {DocumentFragment} opts.messengerNode Where messenger will be placed
 * @param {DocumentFragment} opts.launcherNode Where avatar will be placed
 * @param {DocumentFragment} opts.closeButtonNode Where messenger will be placed
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
 * @return {Messenger}
 * */
function createApp(opts = {}) {
  return new Messenger(opts);
}

export { createApp, User, VIEW_MODES, Messenger, EVENT_ACTIONS };
