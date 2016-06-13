// Template example
var layerAppId ='layer:///apps/staging/52e7c9b4-e9cb-11e5-a188-7d4ed71366e8';
var identityProviderURL = 'https://layer-identity-provider.herokuapp.com/identity_tokens';
var testAPIURL = 'https://m.curaytor.com/api/events';
var consumerUser = null, clientUser = null, messengerApp = null;

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

function getAlgoliaUser(user) {
  return {
    id: user.id,
    avatar_url: user.avatarURL,
    layer_id: user.layerId,
    display_name: user.displayName,
    icon_identity: user.iconIdentity,
    color: user.color,
  };
}

function sendLayerMessage(user, message, conversationUsers) {
  var requestBody = null, xmlhttp = new XMLHttpRequest();

  message.once('messages:sent', function () {
    xmlhttp.open("POST", testAPIURL);
    requestBody = {
      user: getAlgoliaUser(user),
      site: {
        domain: "curaytor.com",
      },
      type: "MESSAGE",
      page: {
        name: window.document.title,
        full_url: window.location.href
      },
      message: {
        id: message.id,
        body: message.parts[0].body,
        conversation_id: message.conversationId
      },
      users: conversationUsers.map(function(u) {
        return getAlgoliaUser(u);
      }),
      logged_at: Date.now()
    };

    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.send( JSON.stringify(requestBody) );
  });
}

function getConversationUsers() {
  var layerUsers = messengerApp.store.getState().LayerUsers, users = [], layerUser,
    results, userLayerIds = [consumerUser.layerId, clientUser.layerId];
  Object.keys(layerUsers).forEach(function(k) {
    results = userLayerIds.filter(function(layerId){
      return k == layerId;
    });
    if (results.length == 0) {
      layerUser = layerUsers[k];
      users.push(layerUser);
    }
  });
  return users;
}

function trackMessage(user, message) {
  sendLayerMessage(user, message, getConversationUsers());
}

function getIdentityToken(nonce, callback){
  layer.xhr({
    url: identityProviderURL,
    headers: {
      'X_LAYER_APP_ID': layerAppId,
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    method: 'POST',
    data: {
      nonce: nonce,
      app_id: layerAppId,
      user_id: consumerUser.layerId
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
