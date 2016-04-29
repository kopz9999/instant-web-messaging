import {
  SUBMIT_COMPOSER_MESSAGE,
  MARK_MESSAGE_READ,
  CHANGE_COMPOSER_MESSAGE,
  SETUP_CONVERSATION,
  CLIENT_READY,
  FETCH_USERS_SUCCESS
} from '../constants/ActionTypes';

import ConversationManager from '../utils/ConversationManager';

import {
  clientReady
} from '../actions/AppActions';

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

function handleAction(layerClient, typingPublisher, state, action, next) {
  const { type, payload } = action;

  switch(type) {
    case SUBMIT_COMPOSER_MESSAGE:
      state.Conversation.activeConversation.createMessage(state.Conversation.composerMessage).send();
      // layerClient
      //   .getConversation(`layer:///conversations/${state.router.params.conversationId}`, true)
      // .createMessage(state.activeConversation.composerMessage).send();

      // typingPublisher.setState(FINISHED);
      return;
    case MARK_MESSAGE_READ:
      layerClient
        .getMessage(payload.messageId).isRead = true;
      return;
    case CHANGE_COMPOSER_MESSAGE:
      console.log('changing composer message pending ...');
      /*
      const conversationId = `layer:///conversations/${state.router.params.conversationId}`;
      const composerMessage = state.activeConversation.composerMessage;
      const typingState = composerMessage.length > 0 ? STARTED : FINISHED;

      if (!typingPublisher.conversation || typingPublisher.conversation.id !== conversationId) {
        typingPublisher.setConversation({ id: conversationId });
      }
      typingPublisher.setState(typingState);
      */
      return;
    default:
      return;
  }
}

const layerMiddleware = layerClient => store => {

  const typingPublisher = layerClient.createTypingPublisher();

  layerClient.on('ready', () => {
    store.dispatch(clientReady());
  });

  return next => action => {
    const state = store.getState();

    handleAction(layerClient, typingPublisher, state, action, next);

    const nextState = next(action);

    handleAfterAction(layerClient, store.getState(), action, next );

    return nextState;
  };
};

export default layerMiddleware;
