import * as actions from '../constants/ActionTypes';

export const setupClientUser = (clientUser, welcomeMessage) => {
  return {
    type: actions.SETUP_CLIENT_USER,
    clientUser,
    welcomeMessage
  }
};
