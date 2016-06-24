function initializeApp() {
  // Layer custom variables
  var launcherNode = jQuery('#chat-app-trigger');

  messengerApp = webMessenger.createApp({
    launcherElement: launcherNode.get(0),
    devToolsNode: document.getElementById('dev-tools'),
    appId: layerAppId,
    challengeCallback: getIdentityToken,
    viewMode: webMessenger.VIEW_MODES.NOTIFICATIONS,
    welcomeMessage: 'Hello, I’m Margaret, realtor at Bridgewater, Warren, if you have any questions please feel free to write anytime.',
    messageNotification: 'Hey, let me know if you have any question',
    isWrapped: false,
    clientUser: clientUser,
    consumerUser: consumerUser,
  });

  launcherNode.on('click', function(){
    window.open('./fullscreen.html', 'messenger');
    return true;
  });
}

document.addEventListener("DOMContentLoaded", function() {
  var http = new XMLHttpRequest();

  // Showing example with custom class and id
  var userData = {
    id: '502c0d48-8ae8-492e-8ec3-4d8b1d48d6f8',
    displayName: 'Visitor',
    layerId: 'Visitor',
  };

  clientUser = new webMessenger.User({
    displayName: 'Margaret Bell',
    roleName: 'Product support',
    layerId: 'Customer Support',
    avatarURL: 'https://s3-us-west-2.amazonaws.com/kopz-projects/Curaytor/Messenger/admin-avatar.png'
  });

  if (QueryString.username) {
    userData.displayName = userData.layerId = userData.id =
      decodeURIComponent(QueryString.username.replace(/\+/g, '%20'));
  }

  http.open("POST", usersAPI, true);
  http.setRequestHeader("Content-type", "application/json");

  http.onreadystatechange = function() {//Call a function when the state changes.
    if(http.readyState == 4 && http.status == 200) {
      consumerUser = new webMessenger.User(JSON.parse(http.responseText));
      initializeApp();
    }
  };

  http.send(JSON.stringify(userData));
});
