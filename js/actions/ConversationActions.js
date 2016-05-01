import {
  SETUP_CONVERSATION,
  LOAD_MORE_MESSAGES
} from '../constants/ActionTypes';

export function setupConversation(activeConversation) {
  return {
    type: SETUP_CONVERSATION,
    payload: {
      activeConversation
    }
  };
}

export function loadMoreMessages() {
  return {
    type: LOAD_MORE_MESSAGES
  };
}
