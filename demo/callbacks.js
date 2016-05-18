document.addEventListener("DOMContentLoaded", function() {
  // Layer custom variables
  clientUser = new webMessenger.User({
    displayName: 'Margaret Bell',
    roleName: 'Product support',
    layerId: 'Customer Support',
    avatarURL: 'https://s3-us-west-2.amazonaws.com/kopz-projects/Curaytor/Messenger/admin-avatar.png'
  });

  consumerUser = new webMessenger.User({
    displayName: 'Customer',
    layerId: 'Customer',
    avatarURL: 'https://s3-us-west-2.amazonaws.com/kopz-projects/Curaytor/Messenger/user-avatar-small.png'
  });

  var targetNode = document.getElementById('app-container');

  if (QueryString.username) {
    consumerUser.displayName = consumerUser.layerId =
      decodeURIComponent(QueryString.username.replace(/\+/g, '%20'));
  }

  var messengerApp = webMessenger.createApp(targetNode,
    {
      appId: layerAppId,
      challengeCallback: getIdentityToken,
      viewMode: webMessenger.VIEW_MODES.MANUAL,
      welcomeMessage: 'Hello, I’m Margaret, realtor at Bridgewater, Warren, if you have any questions please feel free to write anytime.',
      messageNotification: 'Hey, let me know if you have any question',
      clientUser: clientUser,
      consumerUser: consumerUser
    }
  );
  var sheetNode = null;

  messengerApp.on(webMessenger.EVENT_ACTIONS.MESSENGER_SHEET_RENDERED, function(e) {
    sheetNode = jQuery(messengerApp.sheet);
    sheetNode.addClass('app-wrapper');
  });

  messengerApp.on(webMessenger.EVENT_ACTIONS.SHOW_CONTAINER, function(e) {
    jQuery('body').addClass('chat-open');
    sheetNode.addClass('open');
  });

  messengerApp.on(webMessenger.EVENT_ACTIONS.HIDE_CONTAINER, function(e) {
    jQuery('body').removeClass('chat-open');
    sheetNode.removeClass('open');
  });

});
