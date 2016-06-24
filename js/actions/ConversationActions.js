import {
  SETUP_CONVERSATION,
  LOAD_MORE_MESSAGES,
  MARK_MESSAGE_READ,
  RECEIVE_MESSAGE,
  CONVERSATION_CREATE,
  SET_LISTENER_QUERY,
} from '../constants/ActionTypes';

function setListenerQuery(listenerQuery) {
  return {
    type: SET_LISTENER_QUERY,
    payload: {
      listenerQuery,
    }
  };
}

export function removeListenerQuery() {
  return (dispatch, getState) => {
    const listenerQuery = getState().Conversation.listenerQuery;
    listenerQuery.off('change');
    return dispatch(setListenerQuery(null));
  };
}

function handleListenerQueryChange(listenerQueryCallback) {
  return (dispatch, getState) => {
    const state = getState(),
      savedConversations =
        state.Conversation.listenerQuery.data
          .filter((c)=> c.isSaved());
    let conversation;
    if (savedConversations.length > 0) {
      conversation = state.Conversation.activeConversation;
      if (conversation.isSaved()) {
        return dispatch(removeListenerQuery());
      } else {
        dispatch(removeListenerQuery());
        listenerQueryCallback(savedConversations[0]);
        return Promise.resolve();
      }
    } else {
      return Promise.resolve();
    }
  };
}

/*
* TODO: Remove listenerQueryCallback, dissemble conversation manager actions here
* */
export function setupListenerQuery(listenerQuery, listenerQueryCallback) {
  return (dispatch) => {
    dispatch(setListenerQuery(listenerQuery));
    listenerQuery.on('change', ()=>
      dispatch(handleListenerQueryChange(listenerQueryCallback))
    );
    return Promise.resolve();
  };
}

export function setupConversation(activeConversation) {
  return {
    type: SETUP_CONVERSATION,
    payload: {
      activeConversation
    }
  };
}

export function conversationCreate(activeConversationId) {
  return {
    type: CONVERSATION_CREATE,
    payload: {
      activeConversationId
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

export function receiveMessage(lastMessage) {
  return {
    type: RECEIVE_MESSAGE,
    payload: {
      lastMessage
    }
  };
}
