import {
  setupConversation
} from '../actions/ConversationActions';
import { Query } from 'layer-sdk';

export default class ConversationManager {
  assignProperties(client, App, next) {
    this.client = client;
    this.App = App;
    this.next = next;
  };

  filterConversation(conversations, clientUser, consumerUser) {
    const expectedUserIds = [ clientUser.layerId, consumerUser.layerId ];
    return conversations.filter((conversation) => {
      if (conversation.participants.length <= 2) {
        return conversation
          .participants
          .reduce((previousValue, currentValue, i, arr) => (
            expectedUserIds.indexOf(arr[i]) > -1
          ), true);
      }
      return false;
    });
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
    this.next(setupConversation(expectedConversation));
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