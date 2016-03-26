// NOTE: THIS CODE MUST BE REMOVED, it is just for demo purposes
// TODO: Move this code into the component

var layerAppId ='layer:///apps/staging/52e7c9b4-e9cb-11e5-a188-7d4ed71366e8';
// UI variables
var textArea = null;
var messagesArea = null;
// Layer variables
var client = null;
var customerSupportConversation = null;
// Layer custom variables
var currentUser = { name: 'Customer' };
var customerSupportUser = { name: 'Customer Support' };
var clientUser = { name: 'Martin Simpson' };

function getIdentityToken(nonce, callback){
  layer.xhr({
    url: 'https://layer-identity-provider.herokuapp.com/identity_tokens',
    headers: {
      'X_LAYER_APP_ID': layerAppId,
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    method: 'POST',
    data: {
      nonce: nonce,
      app_id: layerAppId,
      user_id: currentUser.name
    }
  }, function(res) {
    if (res.success) {
      console.log('challenge: ok');
      callback(res.data.identity_token);
    } else {
      console.error('challenge error: ', res.data);
    }
  });
}

function renderMessages(messages) {
  messagesArea.empty();
  for (var i = messages.length - 1; i >= 0; --i) {
    var message = messages[i];
    for (var j = 0; j < message.parts.length; ++j) {
      if (message.sender.userId == 'Customer') {
        renderCustomerMessage(message.parts[j].body);
      } else {
        renderCustomerSupportMessage(message.parts[j].body);
      }
    }
  }
  scrollBoxToBottom();
}

function verifyConversations(conversations) {
  var conversation, participant = null;
  for (var i = 0; i < conversations.length; ++i) {
    conversation = conversations[i];
    if (conversation.participants.length < 2) {
      for (var j = 0; j < conversation.participants.length; ++j) {
        participant = conversation.participants[j];
        if (participant == customerSupportUser.name) {
          customerSupportConversation = conversation;
        }
      }
    }
  }
  if (customerSupportConversation == null) {
    customerSupportConversation = client.createConversation({
      participants: [ customerSupportUser.name ],
      distinct: true
    });
  }
  var query = client.createQuery({
    model: layer.Query.Message,
    predicate: 'conversation.id = \'' + customerSupportConversation.id + '\''
  });
  query.on('change', function(evt) {
    renderMessages(query.data);
  });
}

function onClientReady() {
  var query = client.createQuery({
    model: layer.Query.Conversation
  });

  query.on('change', function(evt) {
    var conversations = query.data;
    verifyConversations(conversations);
  });
}

function initializeLayer() {
  client = new layer.Client({
    appId: layerAppId
  });

  client.on('challenge', function(evt) {
    getIdentityToken(evt.nonce, function(identityToken) {
      evt.callback(identityToken);
    })
  });

  client.on('ready', function() {
    onClientReady();
  });
}

function renderCustomerMessage(textMessage) {
  var formattedTextMessage = textMessage.replace("\n", '<br/>');
  var html = '<div class="intercom-conversation-part" style="transform: translate(0px, 0px); opacity: 100;"> \
    <div class="intercom-comment intercom-comment-by-user "> \
      <div class="intercom-comment-body-container "> \
        <div class="intercom-comment-body intercom-embed-body"> \
          <p><span class="display-name">You:</span><br/> '+formattedTextMessage+' </p> \
        </div> \
        <div class="intercom-attachments" style="display: none;"> \
        </div> \
        <div class="intercom-lwr-composer-container"></div> \
      </div> \
    </div> \
  </div>';
  var htmlNode = $.parseHTML(html);
  messagesArea.append(htmlNode);
}

function renderCustomerSupportMessage(textMessage) {
  var formattedTextMessage = textMessage.replace("\n", '<br/>');
  var html = '<div class="intercom-conversation-part"> \
    <div class="intercom-comment intercom-comment-by-admin"> \
      <div class="intercom-comment-body-container "> \
        <div class="intercom-comment-body intercom-embed-body"> \
          <p><span class="display-name">Martin:</span> <br/> '+formattedTextMessage+' </p> \
        </div> \
        <div class="intercom-attachments" style="display: none;"> \
        </div> \
        <div class="intercom-lwr-composer-container"></div> \
      </div> \
    </div> \
  </div>';
  var htmlNode = $.parseHTML(html);
  messagesArea.append(htmlNode);
}

function sendMessage() {
  var textMessage = textArea.val(), message;
  if (textMessage && textMessage != '' && customerSupportConversation != null) {
    message = customerSupportConversation.createMessage(textMessage);
    message.send();
    renderCustomerMessage(textMessage);
    scrollBoxToBottom();
    textArea.val('');
  }
}

function scrollBoxToBottom() {
  $('.intercom-sheet-content').get(0).scrollTop = $('.intercom-sheet-content').get(0).scrollHeight;
}

$(document).ready(function(){
  var launcher = $('.intercom-launcher');
  var messenger = $('.intercom-messenger');
  var closeBtn = $('.intercom-sheet-header-close-button');
  var submitBtn = $('#intercom-container .submit-button');
  textArea = $('#intercom-container .intercom-composer-textarea textarea');
  messagesArea = $('#intercom-container .intercom-conversation-parts');

  launcher.click(function() {
    messenger.show();
    setTimeout(function(){
      scrollBoxToBottom();
    }, 100);
  });
  closeBtn.click(function() {
    messenger.hide();
  });
  submitBtn.click(function(e) {
    e.preventDefault();
    sendMessage();
  });
  textArea.keydown(function(event) {
    if (event.keyCode == 13 && !event.shiftKey) {
      sendMessage();
      event.preventDefault();
    }
  });
  initializeLayer();
});
