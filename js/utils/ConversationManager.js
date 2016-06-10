// Layer
import { Query } from 'layer-sdk';
// App
import { userFactoryInstance } from '../utils/User';
// Actions
import {
  setupConversation,
  receiveMessage,
  conversationCreate,
} from '../actions/ConversationActions';
import {
  receiveLayerUser
} from '../actions/LayerUsersActions';

export default class ConversationManager {
  set getStateCallback(value) {
    this.getState = value;
  }

  get getStateCallback() {
    return this.getState;
  }

  set canUpdateMetadata(value) {
    this._canUpdateMetadata = value;
  }

  get canUpdateMetadata() {
    return this._canUpdateMetadata;
  }

  constructor() {
    this.getState = null;
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
            this.next(conversationCreate(change.newValue));
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
    let expectedConversation = null;
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
    }
    expectedConversation.on('conversations:change',
      (e)=> this.handleConversationChange(e) );
    this.setupMetadata(expectedConversation);
    this.next(setupConversation(expectedConversation));
    this.next(receiveMessage(expectedConversation.lastMessage));
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
