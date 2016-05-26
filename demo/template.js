document.addEventListener("DOMContentLoaded", function() {
  // Layer custom variables
  var launcherNode = jQuery('#chat-app-trigger');
  var closeButtonNode = jQuery('#chat-app-close');
  var messengerNode = jQuery('#chat-app-content');

  clientUser = new webMessenger.User({
    displayName: 'Margaret Bell',
    roleName: 'Product support',
    layerId: 'Customer Support',
    avatarURL: 'https://s3-us-west-2.amazonaws.com/kopz-projects/Curaytor/Messenger/admin-avatar.png'
  });

  // Showing example with custom class and id
  consumerUser = {
    id: '502c0d48-8ae8-492e-8ec3-4d8b1d48d6f8',
    displayName: 'Customer',
    layerId: 'Customer',
    avatarURL: 'https://s3-us-west-2.amazonaws.com/kopz-projects/Curaytor/Messenger/user-avatar-small.png'
  };

  if (QueryString.username) {
    consumerUser.displayName = consumerUser.layerId =
      decodeURIComponent(QueryString.username.replace(/\+/g, '%20'));
  }

  messengerApp = webMessenger.createApp({
    launcherElement: launcherNode.get(0),
    closeButtonElement: closeButtonNode.get(0),
    messengerElement: messengerNode.get(0),
    devToolsNode: document.getElementById('dev-tools'),
    appId: layerAppId,
    challengeCallback: getIdentityToken,
    viewMode: webMessenger.VIEW_MODES.MANUAL,
    welcomeMessage: 'Hello, I’m Margaret, realtor at Bridgewater, Warren, if you have any questions please feel free to write anytime.',
    messageNotification: 'Hey, let me know if you have any question',
    isWrapped: false,
    clientUser: clientUser,
    consumerUser: consumerUser,
  });

  launcherNode.on('click', function(){
    jQuery('body').addClass('chat-open');
    jQuery('#chat-app-container').addClass('open');
  });

  closeButtonNode.on('click', function(){
    jQuery('body').removeClass('chat-open');
    jQuery('#chat-app-container').removeClass('open');
  });

  messengerApp.on(webMessenger.ACTION_EVENTS.SHOW_CONTAINER, function(e) {
    console.log('Show event');
  });

  messengerApp.on(webMessenger.ACTION_EVENTS.HIDE_CONTAINER, function(e) {
    console.log('Hide event');
  });

  messengerApp.on(webMessenger.ACTION_EVENTS.MESSAGE_CREATE, function(e) {
    trackMessage(consumerUser, e.consumerMessage);
  });
});
