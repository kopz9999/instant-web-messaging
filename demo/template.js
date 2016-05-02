// Template example
var layerAppId ='layer:///apps/staging/52e7c9b4-e9cb-11e5-a188-7d4ed71366e8';
var identityProviderURL = 'https://layer-identity-provider.herokuapp.com/identity_tokens';

// Layer custom variables
var clientUser = {
  displayName: 'Margaret Bell',
  roleName: 'Product support',
  layerId: 'Customer Support',
  avatar: {
    url: 'https://s3-us-west-2.amazonaws.com/kopz-projects/Curaytor/Messenger/admin-avatar.png'
  }
};

var consumerUser = {
  displayName: 'Customer',
  layerId: 'Customer',
  avatar: {
    url: 'https://s3-us-west-2.amazonaws.com/kopz-projects/Curaytor/Messenger/user-avatar-small.png'
  }
};

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

document.addEventListener("DOMContentLoaded", function() {
  if (QueryString.username) {
    consumerUser.displayName = consumerUser.layerId =
      decodeURIComponent(QueryString.username.replace(/\+/g, '%20'));
  }

  webMessenger.render('app-container',
    {
      appId: layerAppId,
      challengeCallback: getIdentityToken,
      viewMode: 'split',
      pageContentNode: document.getElementsByClassName("page-content")[0],
      welcomeMessage: 'Hello, I’m Margaret, realtor at Bridgewater, Warren, if you have any questions please feel free to write anytime.',
      messageNotification: 'Hey, let me know if you have any question',
      clientUser: clientUser,
      consumerUser: consumerUser
    }
  );
});