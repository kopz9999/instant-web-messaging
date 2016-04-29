import {
  SETUP_CONVERSATION
} from '../constants/ActionTypes';

export function setupConversation(activeConversation) {
  return {
    type: SETUP_CONVERSATION,
    payload: {
      activeConversation
    }
  };
}
