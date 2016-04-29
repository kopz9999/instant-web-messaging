import {
  SETUP_CONVERSATION,
  CHANGE_COMPOSER_MESSAGE
} from '../constants/ActionTypes';

const initialState = {
  activeConversationId: null,
  activeConversation: null,
  messagePagination: 30
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
    case CHANGE_COMPOSER_MESSAGE:
      return {
        ...state,
        composerMessage: payload.value
      };
    default:
      return state;
  }
}
