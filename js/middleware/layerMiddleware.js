// TODO: Remove middleware and setup as admin

import {
  SUBMIT_COMPOSER_MESSAGE,
  MARK_MESSAGE_READ,
  CHANGE_COMPOSER_MESSAGE,
  CLIENT_READY,
  FETCH_USERS_SUCCESS
} from '../constants/ActionTypes';

import ACTION_EVENTS from '../constants/ActionEvents';
import { conversationManagerInstance } from '../utils/ConversationManager';

import { clientReady } from '../actions/AppActions';

// Layer
import { TypingIndicators, QueryBuilder } from 'layer-sdk';

const {
  STARTED,
  FINISHED
} = TypingIndicators;

function handleAfterAction(layerClient, state, action, next) {
  const { type } = action;
  switch(type) {
    case CLIENT_READY:
      conversationManagerInstance.retrieveConversation(layerClient, state.App, next);
      return;
    case FETCH_USERS_SUCCESS:
      conversationManagerInstance.retrieveConversation(layerClient, state.App, next);
      return;
  }
}

function handleAction(layerClient, typingPublisher, state, action, next,
                      messengerInstance) {
  const { type, payload } = action;
  let consumerMessage = null;

  switch(type) {
    case SUBMIT_COMPOSER_MESSAGE:
      const { activeConversation } = state.Conversation;
      consumerMessage =
        activeConversation.createMessage(state.Conversation.composerMessage)
        .send();
      if (activeConversation.isSaved()) {
        messengerInstance.dispatchEvent(ACTION_EVENTS.MESSAGE_CREATE,
          { consumerMessage });
      }
      typingPublisher.setState(FINISHED);
      return;
    case MARK_MESSAGE_READ:
      layerClient.getMessage(payload.messageId).isRead = true;
      return;
    case CHANGE_COMPOSER_MESSAGE:
      const conversationId = state.Conversation.activeConversationId;
      const composerMessage = state.Conversation.composerMessage;
      const typingState = composerMessage.length > 0 ? STARTED : FINISHED;

      if (!typingPublisher.conversation || typingPublisher.conversation.id !== conversationId) {
        typingPublisher.setConversation({ id: conversationId });
      }
      typingPublisher.setState(typingState);
      return;
    default:
      return;
  }
}

const layerMiddleware = (layerClient, messengerInstance) => store => {

  const typingPublisher = layerClient.createTypingPublisher();
  // Before initializing store reference
  conversationManagerInstance.getStateCallback = store.getState;
  conversationManagerInstance.dispatchCallback = store.dispatch;

  layerClient.on('ready', () => {
    store.dispatch(clientReady());
  });

  return next => action => {
    const state = store.getState();

    handleAction(layerClient, typingPublisher, state, action, next,
      messengerInstance);

    const nextState = next(action);

    handleAfterAction(layerClient, store.getState(), action, next );

    return nextState;
  };
};

export default layerMiddleware;
