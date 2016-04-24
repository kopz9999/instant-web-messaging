// NOTE: THIS CODE MUST BE REMOVED, it is just for demo purposes
// TODO: Move this code into the component

var layerAppId ='layer:///apps/staging/52e7c9b4-e9cb-11e5-a188-7d4ed71366e8';
// UI variables
var textArea = null;
var messagesArea = null;
var pageContent = null;
var messenger = null;
var launcher = null;
var typingIndicatorContainer = null;
var adminHeaderContainer = null;
var notificationContainer = null;
// UI triggers
var doingAnimation = false;
var doingTypingIndicatorAnimation = false;
var hidingTypingIndicatorAnimation = false;
var isMessengerVisible = false;
var hidingNotificationBox = false;
var hideNotificationTimeouts = [];
var pendingNotificationsCallbacks = [];
// Layer variables
var client = null;
var customerSupportConversation = null;
// Layer custom variables
var currentUser = { name: 'Customer' };
var customerSupportUser = { name: 'Customer Support' };
var clientUser = { name: 'Judy' };
var sheetContent = null;
var currentMessages = null;

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

/* Start Notification related Functions */

function renderNotificationBadge(notificationsNumber) {
  var tag = $('.intercom-launcher-notification');
  tag.text(notificationsNumber);
}

function renderPendingNotifications() {
  var callback;
  if (pendingNotificationsCallbacks.length > 0) {
    if (!notificationContainer.is(':visible')) {
      showNotificationBox();
    }
    while((callback=pendingNotificationsCallbacks.pop()) != null) {
      callback();
    }
  }
}

function showNotificationBox() {
  notificationContainer.show("drop", {
    direction: "up"
  });
}

function hideNotificationBox() {
  if (!hidingNotificationBox) {
    hidingNotificationBox = true;
    notificationContainer.fadeOut({
      complete: function() {
        hidingNotificationBox = false;
        renderPendingNotifications();
      }
    });
  }
}

function enqueueHideNotificationBox() {
  var timeoutId;
  while((timeoutId=hideNotificationTimeouts.pop()) != null) {
    clearTimeout(timeoutId);
  }
  hideNotificationTimeouts.push(
    setTimeout(function () {
      hideNotificationBox();
    }, 5000)
  );
}

function updateNotificationMessage(message) {
  var displayMessage = message, maxSize = 29;
  var notificationTextContainer = $('#intercom-container .notification-container .display-message');
  if (displayMessage.length > maxSize) {
    displayMessage = displayMessage.substring(0, maxSize) + '...';
  }
  notificationTextContainer.text(displayMessage);
  enqueueHideNotificationBox();
}

function verifyNotification() {
  var lastTextMessage;
  if (!isMessengerVisible) {
    if (customerSupportConversation.lastMessage.sender.userId ==
        customerSupportUser.name) {
      if (!customerSupportConversation.lastMessage.isRead) {
        lastTextMessage =
            customerSupportConversation.lastMessage.parts[0].body;
        if (hidingNotificationBox) {
          pendingNotificationsCallbacks.push( function() {
            updateNotificationMessage(lastTextMessage);
          });
        } else {
          if (!notificationContainer.is(':visible')) {
            showNotificationBox();
          }
          updateNotificationMessage(lastTextMessage);
        }
      }
    }
  }
}

/* End related notification functions */

function renderMessages(messages, newItem) {
  messagesArea.empty();
  currentMessages = messages;
  var notifications = 1;
  for (var i = messages.length - 1; i >= 0; --i) {
    var message = messages[i];
    // Do not render if the item already exists
    if (newItem!= null && newItem.id == message.id) continue;
    if (message.sender.userId == currentUser.name) {
      renderCustomerMessage(message, false );
    } else if (message.sender.userId == customerSupportUser.name) {
      if (isMessengerVisible) {
        message.isRead = true;
      } else {
        if (!message.isRead) {
          ++notifications;
        }
      }
      renderCustomerSupportMessage(message, false );
    }
  }
  if (newItem!= null) {
    if (newItem.sender.userId == currentUser.name) {
      renderCustomerMessage(newItem, true );
    } else {
      renderCustomerSupportMessage(newItem, true );
    }
  } else {
    scrollBoxToBottom();
  }
  verifyNotification();
  renderNotificationBadge(notifications);
}

function verifyConversations(conversations) {
  var conversation, participant = null;
  var typingListener = client.createTypingListener(textArea[0]);
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
  /*
  var query = client.createQuery({
    model: layer.Query.Message,
    predicate: 'conversation.id = \'' + customerSupportConversation.id + '\''
  });
  */
  var builder = layer.QueryBuilder
      .messages()
      .forConversation(customerSupportConversation.id)
      .paginationWindow(50);
  var query = client.createQuery(builder);
  query.on('change', function(evt) {
    onConversationChange(query, evt);
  });
  client.on('typing-indicator-change', function(evt) {
    verifyCustomerSupportTyping(evt);
  });
  typingListener.setConversation(customerSupportConversation);
}

function showCustomerSupportTyping() {
  if (!doingTypingIndicatorAnimation && !hidingTypingIndicatorAnimation) {
    doingTypingIndicatorAnimation = true;
    typingIndicatorContainer.show("drop", {
      direction: "down",
      complete: function() {
        doingTypingIndicatorAnimation = false;
        setTimeout(function () {
          hideCustomerSupportTyping();
        }, 1000);
      }
    });
    scrollBoxToBottom();
  }
}

function hideCustomerSupportTyping() {
  if (!hidingTypingIndicatorAnimation) {
    hidingTypingIndicatorAnimation = true;
    typingIndicatorContainer.fadeOut({
      duration: 'slow',
      complete: function() {
        hidingTypingIndicatorAnimation = false;
      }
    });
  }
}

function verifyCustomerSupportTyping(evt) {
  if (evt.conversationId === customerSupportConversation.id) {
    for (var i = 0; i < evt.typing.length; i++) {
      if (evt.typing[i] === customerSupportUser.name) {
        showCustomerSupportTyping();
      }
    }
    for (var j = 0; j < evt.paused.length; j++) {
      if (evt.paused[j] === customerSupportUser.name) {
        hideCustomerSupportTyping();
      }
    }
  }
}

function onConversationChange(query, evt) {
  if (doingAnimation) {
    var interval = setInterval(function () {
      if (!doingAnimation) {
        doOnConversationChange(query, evt);
        clearInterval(interval);
      }
    }, 1000);
  } else {
    doOnConversationChange(query, evt);
  }
}

function doOnConversationChange(query, evt) {
  if (evt.type === 'insert') {
    renderMessages(query.data, evt.target);
  } else {
    renderMessages(query.data, null);
  }
}

function showInitialNotification() {
  showNotificationBox();
  enqueueHideNotificationBox();
}

function displayInitialContent() {
  setTimeout(function(){
    launcher.show();
    showInitialNotification();
  }, 500);
}

function onClientReady() {
  var rendered = false;
  var query = client.createQuery({
    model: layer.Query.Conversation
  });
  displayInitialContent();
  query.on('change', function(evt) {
    var conversations = query.data;
    if (!rendered) {
      verifyConversations(conversations);
      rendered = true;
    }
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

function renderMessageMetadata(message, recipientUser) {
  var statusHtml = '', statusString;
  var userId = recipientUser ? recipientUser.name : null;
  if (userId != null) {
    statusString = message.recipientStatus[userId] == 'read' ? 'Read' : null;
    if (statusString != null) {
      statusHtml = '<div class="intercom-comment-readstate">Read</div>';
    }
  }
  var html = '<div class="intercom-comment-metadata-container"> \
    <div class="intercom-comment-metadata"> \
      <span class="intercom-comment-state"> \
      </span> \
      <span class="intercom-relative-time">'+formatTimestamp(message.sentAt)+'</span> \
    </div> \
    ' + statusHtml + ' \
  </div>';
  return html;
}

function formatTimestamp(date) {
  var now = new Date();
  if (!date) return now.toLocaleDateString();
  if (date.toLocaleDateString() === now.toLocaleDateString()) {
    return date.toLocaleTimeString(navigator.language,
        {
          hour12: false,
          hour: '2-digit',
          minute:'2-digit'
        }
    );
  }
  else return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}

function appendHtml(html, doAnimation) {
  var htmlNode = $.parseHTML(html);
  var jqueryNode = $(htmlNode[0]);
  if (doAnimation) {
    jqueryNode.hide();
    messagesArea.append(jqueryNode);
    sheetContent.css('padding-bottom', 110);
    scrollBoxToBottom();
    doingAnimation = true;
    jqueryNode.show("drop", {
      direction: "down",
      complete: function() {
        sheetContent.css('padding-bottom', 0);
        doingAnimation = false;
      }
    });
  } else {
    messagesArea.append(jqueryNode);
  }
}

function renderCustomerMessage(message, doAnimation) {
  var textMessage = message.parts[0].body;
  var formattedTextMessage = textMessage.replace("\n", '<br/>');
  var html = '<div class="intercom-conversation-part" style="transform: translate(0px, 0px); opacity: 100;"> \
    <div class="intercom-comment intercom-comment-by-user "> \
      <img src="./demo/user-avatar-small.png" class="intercom-comment-avatar"> \
      <div class="intercom-comment-body-container "> \
        <div class="intercom-comment-body intercom-embed-body"> \
          <p><span class="display-name">You:</span><br/> '+formattedTextMessage+' </p> \
        </div> \
        <div class="intercom-attachments" style="display: none;"> \
        </div> \
        <div class="intercom-lwr-composer-container"></div> \
      </div> \
      ' + renderMessageMetadata(message, customerSupportUser) + ' \
    </div> \
  </div>';
  appendHtml(html, doAnimation);
}

function renderCustomerSupportMessage(message, doAnimation) {
  var textMessage = message.parts[0].body;
  var formattedTextMessage = textMessage.replace("\n", '<br/>');
  var clientDisplayName = clientUser.name.split(' ')[0];
  var html = '<div class="intercom-conversation-part"> \
    <div class="intercom-comment intercom-comment-by-admin"> \
      <div class="intercom-comment-body-container "> \
        <div class="intercom-comment-body intercom-embed-body"> \
          <p><span class="display-name">' + clientDisplayName +'</span> <br/> '+formattedTextMessage+' </p> \
        </div> \
        <div class="intercom-attachments" style="display: none;"> \
        </div> \
        <div class="intercom-lwr-composer-container"></div> \
      </div> \
      <img src="./demo/admin-avatar-small.png" class="intercom-comment-avatar"> \
      ' + renderMessageMetadata(message, null) + ' \
    </div> \
  </div>';
  appendHtml(html, doAnimation);
}

function sendMessage() {
  var textMessage = textArea.val(), message;
  if (textMessage && textMessage != '' && customerSupportConversation != null) {
    message = customerSupportConversation.createMessage(textMessage);
    message.send();
    // renderCustomerMessage(message, true);
    // scrollBoxToBottom();
    textArea.val('');
  }
}

function scrollBoxToBottom() {
  sheetContent.get(0).scrollTop = sheetContent.get(0).scrollHeight;
}

function resizePageContent() {
  var splitWidth;
  if (messenger.css('right') >= 0) {
    splitWidth = window.innerWidth - 320;
    pageContent.css('width', splitWidth);
  } else {
    pageContent.css('width', '100%');
  }
}

function tagReadMessages() {
  if (currentMessages != null) {
    for (var i = currentMessages.length - 1; i >= 0; --i) {
      var message = currentMessages[i];
      if (message.sender.userId == customerSupportUser.name) {
        message.isRead = true;
      }
    }
  }
}

function animateHideMessenger() {
  isMessengerVisible = false;
  messenger.animate({
    right: "-320px"
  });
  pageContent.animate({
    width: "+=320px"
  });
  setTimeout(function () {
    notificationContainer.css('visibility', 'visible');
  }, 1000);
}

function animateShowMessenger() {
  isMessengerVisible = true;
  messenger.animate({
    right: "0"
  });
  pageContent.animate({
    width: "-=320px"
  });
  notificationContainer.css('visibility', 'hidden');
  tagReadMessages();
}

function showAdminHeaderContainer() {
  if (sheetContent.get(0).scrollTop > 180) {
    adminHeaderContainer.show("drop", {
      direction: "up"
    });
  } else {
    adminHeaderContainer.hide("drop", {
      direction: "up"
    });
  }
}

var QueryString = function () {
  // This function is anonymous, is executed immediately and
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
      // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
      // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }
  return query_string;
}();

$(document).ready(function(){
  var closeBtn = $('.intercom-sheet-header-close-button');
  var submitBtn = $('#intercom-container .submit-button');
  var cleanTrigger = $('#clean-trigger');
  launcher = $('.intercom-launcher');
  textArea = $('#intercom-container .intercom-composer-textarea textarea');
  messagesArea = $('#intercom-container .intercom-conversation-parts.dynamic');
  pageContent = $('.page-content');
  messenger = $('#intercom-container .intercom-sheet');
  sheetContent = $('.intercom-sheet-content');
  typingIndicatorContainer = $('.intercom-conversation-parts.typing-indicator');
  adminHeaderContainer = $('#intercom-container .intercom-sheet-header.admin-header');
  notificationContainer = $('#intercom-container .notification-container');

  launcher.click(function() {
    animateShowMessenger();
  });
  notificationContainer.click(function() {
    animateShowMessenger();
  });
  closeBtn.click(function() {
    animateHideMessenger();
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
  $( window ).resize(function() {
    resizePageContent();
  });
  cleanTrigger.click(function() {
    customerSupportConversation.delete(true);
  });
  // Initialize test user if required
  if (QueryString.username) {
    currentUser.name =
      decodeURIComponent(QueryString.username.replace(/\+/g, '%20'));
  }
  sheetContent.get(0).addEventListener("scroll", function(){
    showAdminHeaderContainer();
  });

  resizePageContent();
  initializeLayer();
  webMessenger.render('intercom-container');
});
