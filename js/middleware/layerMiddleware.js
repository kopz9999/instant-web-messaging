import {
  SUBMIT_COMPOSER_MESSAGE,
  MARK_MESSAGE_READ,
  CHANGE_COMPOSER_MESSAGE,
  CLIENT_READY,
  FETCH_USERS_SUCCESS
} from '../constants/ActionTypes';

import ACTION_EVENTS from '../constants/ActionEvents';

import ConversationManager from '../utils/ConversationManager';

import { clientReady } from '../actions/AppActions';

// Layer
import { TypingIndicators, QueryBuilder } from 'layer-sdk';

const {
  STARTED,
  FINISHED
} = TypingIndicators;

const conversationManager = new ConversationManager();

function handleAfterAction(layerClient, state, action, next) {
  const { type } = action;
  switch(type) {
    case CLIENT_READY:
      conversationManager.retrieveConversation(layerClient, state.App, next);
      return;
    case FETCH_USERS_SUCCESS:
      conversationManager.retrieveConversation(layerClient, state.App, next);
      return;
  }
}

function handleAction(layerClient, typingPublisher, state, action, next,
                      messengerInstance) {
  const { type, payload } = action;
  let consumerMessage = null;

  switch(type) {
    case SUBMIT_COMPOSER_MESSAGE:
      consumerMessage = state.Conversation.activeConversation
                             .createMessage(state.Conversation.composerMessage)
      consumerMessage.send();
      messengerInstance.dispatchEvent(ACTION_EVENTS.MESSAGE_CREATE, { consumerMessage });
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

  layerClient.on('ready', () => {
    store.dispatch(clientReady());
  });

  return next => action => {
    const state = store.getState();
    conversationManager.getState = store.getState;

    handleAction(layerClient, typingPublisher, state, action, next,
      messengerInstance);

    const nextState = next(action);

    handleAfterAction(layerClient, store.getState(), action, next );

    return nextState;
  };
};

export default layerMiddleware;
