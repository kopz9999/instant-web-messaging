import {
  SETUP_CONVERSATION,
  LOAD_MORE_MESSAGES,
  MARK_MESSAGE_READ,
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

export function markMessageRead(messageId) {
  return {
    type: MARK_MESSAGE_READ,
    payload: {
      messageId
    }
  }
}
