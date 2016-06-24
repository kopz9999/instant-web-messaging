// Layer
import { Query, QueryBuilder } from 'layer-sdk';
// App
import { userFactoryInstance } from '../utils/User';
// Actions
import {
  setupConversation,
  receiveMessage,
  conversationCreate,
  removeListenerQuery,
  setupListenerQuery,
} from '../actions/ConversationActions';
import {
  receiveLayerUser
} from '../actions/LayerUsersActions';
// Events
import ACTION_EVENTS from '../constants/ActionEvents';

export default class ConversationManager {
  set getStateCallback(value) {
    this.getState = value;
  }

  get getStateCallback() {
    return this.getState;
  }

  set dispatchCallback(value) {
    this.dispatch = value;
  }

  get dispatchCallback() {
    return this.dispatch;
  }

  set messengerInstance(value) {
    this._messengerInstance = value;
  }

  get messengerInstance() {
    return this._messengerInstance;
  }

  set canUpdateMetadata(value) {
    this._canUpdateMetadata = value;
  }

  get canUpdateMetadata() {
    return this._canUpdateMetadata;
  }

  constructor() {
    this.getState = null;
    this.dispatch = null;
    this._messengerInstance = null;
    this._currentQuery = null;
    this._canUpdateMetadata = false;
  }

  assignProperties(client, App, next) {
    this.client = client;
    this.App = App;
    this.next = next;
  };

  filterConversation(conversations, clientUser, consumerUser) {
    const expectedUserIds = [ clientUser.layerId.toString(),
      consumerUser.layerId.toString() ];
    let participants = null;
    return conversations.filter((conversation) => {
      participants = conversation.participants;
      return expectedUserIds.reduce((previousValue, currentValue, i, arr) => (
        participants.indexOf(expectedUserIds[i]) > -1
      ), true);
    });
  }

  processFirstMessage(conversationId) {
    let query = this.client.createQuery({
      model: Query.Message,
      dataType: Query.InstanceDataType
    });
    query.update(
      QueryBuilder
        .messages()
        .forConversation(conversationId)
        .paginationWindow(1)
    );
    query.once('change', (evt)=>{
      if (evt.type === 'insert') {
        this.messengerInstance.dispatchEvent(ACTION_EVENTS.MESSAGE_CREATE,
          { consumerMessage: evt.target });
      }
    })
  }

  handleConversationChange(e) {
    if (e.changes) {
      e.changes.forEach((change)=> {
        switch (change.property) {
          case "lastMessage":
            this.next(receiveMessage(change.newValue));
            break;
          case "metadata":
            this.readMetadata(change.newValue.appParticipants);
            break;
          case "id":
            this.dispatch(removeListenerQuery());
            this.next(conversationCreate(change.newValue));
            this.processFirstMessage(change.newValue);
            break;
        }
      });
    }
  }

  // NOTE: This process is supposed to be done 1 time
  updateMetadata(conversation, storedParticipants = {}) {
    const { clientUser, consumerUser } = this.App;
    const originalAppParticipants = [clientUser, consumerUser];
    let metaData = {};
    // Serialize Properties
    const appParticipants = originalAppParticipants.map((userObj) => {
      userFactoryInstance.applyDefaultProperties(userObj);
      return userFactoryInstance.serializeUser(userObj)
    });
    Object.keys(storedParticipants).forEach((i) => {
      metaData[`appParticipants.${i}`] = storedParticipants[i];
    });
    appParticipants.forEach((user, i) => {
      metaData[`appParticipants.${i}`] = user;
    });
    conversation.setMetadataProperties(metaData);
  }

  // TODO: Read previously stored users to merge stored properties
  readMetadata(appParticipants, canMerge=false) {
    const state = this.getState();
    const { LayerUsers: layerUsers  } = state;
    let metadataObject = null, layerUser, stateKey;
    Object.keys(appParticipants).forEach((k)=> {
      metadataObject = appParticipants[k];
      stateKey = metadataObject.layerId.toString();
      layerUser = layerUsers[stateKey];
      if (!layerUser) {
        layerUser = userFactoryInstance.buildFromMetadata(metadataObject);
        this.next( receiveLayerUser( stateKey, layerUser ) );
      } else if(canMerge) {
        userFactoryInstance.applyMetaDataProperties(layerUser, metadataObject);
      }
    });
  }

  setupMetadata(conversation) {
    const { appParticipants } = conversation.metadata;
    if (appParticipants) {
      if (this.canUpdateMetadata) {
        this.updateMetadata(conversation, appParticipants);
      }
      this.readMetadata(appParticipants, true);
    } else {
      this.updateMetadata(conversation);
    }
  }

  onQueryReady(conversations) {
    let expectedConversation = null, listenerQuery;
    const { clientUser, consumerUser } = this.App;
    const expectedConversationResult =
      this.filterConversation(conversations, clientUser, consumerUser);
    if (expectedConversationResult.length > 0) {
      expectedConversation = expectedConversationResult[0];
    } else {
      expectedConversation = this.client.createConversation({
        true,
        participants: [ this.App.clientUser.layerId ]
      });
      listenerQuery = this.client.createQuery({ model: Query.Conversation });
      this.dispatch(
        setupListenerQuery(listenerQuery, this.setConversation.bind(this))
      );
    }
    this.setConversation(expectedConversation);
  }

  setConversation(conversation) {
    conversation.on('conversations:change',
      (e)=> this.handleConversationChange(e) );
    this.setupMetadata(conversation);
    this.next(setupConversation(conversation));
    this.next(receiveMessage(conversation.lastMessage));
  }

  queryForConversations() {
    // TODO: Check if there's a better way to query
    const query = this.client.createQuery({
      model: Query.Conversation
    });
    query.once('change', ()=> this.onQueryReady(query.data) );
  }

  retrieveConversation(client, App, next) {
    this.assignProperties(client, App, next);
    if (!this.App.ready) return;
    this.queryForConversations();
  };
};

export const conversationManagerInstance = new ConversationManager();
