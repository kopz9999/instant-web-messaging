import {
  SETUP_CONVERSATION,
  CONVERSATION_CREATE,
  CHANGE_COMPOSER_MESSAGE,
  LOAD_MORE_MESSAGES,
  SUBMIT_COMPOSER_MESSAGE,
  RECEIVE_MESSAGE,
} from '../constants/ActionTypes';

const initialState = {
  activeConversationId: null,
  activeConversation: null,
  lastMessage: null,
  messagePagination: 30,
  composerMessage: ''
};

export default function(state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case SETUP_CONVERSATION:
      return {
        ...state,
        activeConversationId: payload.activeConversation.id,
        activeConversation: payload.activeConversation
      };
    case CONVERSATION_CREATE:
      return {
        ...state,
        activeConversationId: payload.activeConversationId,
      };
    case CHANGE_COMPOSER_MESSAGE:
      return {
        ...state,
        composerMessage: payload.value
      };
    case SUBMIT_COMPOSER_MESSAGE:
      return {
        ...state,
        composerMessage: ''
      };
    case LOAD_MORE_MESSAGES:
      return {
        ...state,
        messagePagination: state.messagePagination + 30
      };
    case RECEIVE_MESSAGE:
      return {
        ...state,
        lastMessage: payload.lastMessage
      };
    default:
      return state;
  }
}
