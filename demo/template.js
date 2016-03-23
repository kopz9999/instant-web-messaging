// NOTE: THIS CODE MUST BE REMOVED, it is just for demo purposes
// TODO: Move this code into the component

var layerAppId ='layer:///apps/staging/52e7c9b4-e9cb-11e5-a188-7d4ed71366e8';
// UI variables
var textArea = null;
var messagesArea = null;
// Layer variables
var client = null;
var conversation = null;
// Layer custom variables
var currentUser = { name: 'Customer' };
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
  console.log(messages.length);
  for (var i = 0; i < messages.length; ++i) {
    var message = messages[i];
    console.log(message.parts);
    for (var j = 0; j < message.parts.length; ++j) {
      console.log(message.parts[j]);
      renderCustomerMessage(message.parts[j].body);
    }
  }
}

function onClientReady() {
  conversation = client.createConversation({
    participants: [ clientUser.name ],
    distinct: true
  });
  /*
  var query = client.createQuery({
    model: layer.Query.Message,
    predicate: 'conversation.id = \'' + conversation.id + '\'',
    paginationWindow: 20
  });

  var rendered = false;
  query.on('change', function(evt) {
    var messages = query.data;
    if (!rendered) {
      renderMessages(messages);
      //rendered = true;
    }
  });
  */
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
          <p>You: <br/> '+formattedTextMessage+' </p> \
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
  if (textMessage && textMessage != '' && conversation != null) {
    message = conversation.createMessage(textMessage);
    message.send();
    renderCustomerMessage(textMessage);
    $('.intercom-sheet-content').get(0).scrollTop = $('.intercom-sheet-content').get(0).scrollHeight;
    textArea.val('');
  }
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
