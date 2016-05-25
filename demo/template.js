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

  consumerUser = new webMessenger.User({
    displayName: 'Customer',
    layerId: 'Customer',
    avatarURL: 'https://s3-us-west-2.amazonaws.com/kopz-projects/Curaytor/Messenger/user-avatar-small.png'
  });

  if (QueryString.username) {
    consumerUser.displayName = consumerUser.layerId =
      decodeURIComponent(QueryString.username.replace(/\+/g, '%20'));
  }

  messengerApp = webMessenger.createApp({
    launcherElement: launcherNode.get(0),
    closeButtonElement: closeButtonNode.get(0),
    messengerElement: messengerNode.get(0),
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
    jQuery('body')/*.css('overflow','hidden')*/.addClass('chat-open');
    jQuery('#chat-app-container').addClass('open');
    messengerApp.show();
    //jQuery('header').addClass('dark');
  });

  closeButtonNode.on('click', function(){
    jQuery('body').removeClass('chat-open')/*.css('overflow','auto')*/;
    jQuery('#chat-app-container').removeClass('open');
    messengerApp.hide();
    //jQuery('header').removeClass('dark');
  });
});
