document.addEventListener("DOMContentLoaded", function() {
  // Layer custom variables
  var messengerNode = document.getElementById('root');

  clientUser = new webMessenger.User({
    displayName: 'Margaret Bell',
    roleName: 'Product support',
    layerId: 'Customer Support',
    avatarURL: 'https://s3-us-west-2.amazonaws.com/kopz-projects/Curaytor/Messenger/admin-avatar.png'
  });

  // Showing example with custom class and id
  consumerUser = {
    id: '502c0d48-8ae8-492e-8ec3-4d8b1d48d6f8',
    displayName: 'Visitor',
    layerId: 'Visitor',
  };

  if (QueryString.username) {
    consumerUser.displayName = consumerUser.layerId =
      decodeURIComponent(QueryString.username.replace(/\+/g, '%20'));
  }

  messengerApp = webMessenger.createApp({
    messengerElement: messengerNode,
    devToolsNode: document.getElementById('dev-tools'),
    appId: layerAppId,
    challengeCallback: getIdentityToken,
    viewMode: webMessenger.VIEW_MODES.FULL_SCREEN,
    welcomeMessage: 'Hello, I’m Margaret, realtor at Bridgewater, Warren, if you have any questions please feel free to write anytime.',
    messageNotification: 'Hey, let me know if you have any question',
    isWrapped: false,
    clientUser: clientUser,
    consumerUser: consumerUser,
    closeRoute: './notifications.html'
  });

  processMessengerApp(messengerApp);
});
