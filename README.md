
# instant-web-messaging (instant-web-messaging)

> Layer web component for messaging

# Usage

This project contains a bundle that renders a [Layer's Messaging] (https://layer.com/) Application into any website.
The application is a JavaScript bundle by itself that does not require any server for it's deployment and it can be delivered from a CDN.

[Live Demo](https://curaytor-web-messaging.herokuapp.com)

To display this component in any website, add the following dependencies:

```html
  <!-- Fonts -->
  <link type="text/css" rel="stylesheet" href="https://fast.fonts.net/cssapi/62e9cdee-1429-474a-8e7d-1929c597add2.css"/>
  <!-- Layer Web SDK -->
  <script src='https://cdn.layer.com/sdk/0.9/layer-websdk.min.js'></script>
  <!-- App Bundler -->
  <script src="https://curaytor-web-messaging.herokuapp.com/static/bundle.js"></script>

```

After having the dependencies, just call the global object "webMessenger"

```js
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

  webMessenger.render('app-container',   // app-container is the id of the div where is going to be mounted
    {
      appId: layerAppId,
      challengeCallback: getIdentityToken,
      viewMode: 'overlay',
      welcomeMessage: 'Hello, I’m Margaret, realtor at Bridgewater, Warren, if you have any questions please feel free to write anytime.',
      messageNotification: 'Hey, let me know if you have any question',
      clientUser: clientUser,
      consumerUser: consumerUser
    }
  );

```

## Running your project

The generated project includes a development server on port `3000`, which will rebuild the app whenever you change application code. To start the server (with the dev-tools enabled), run:

```bash
$ npm start
```

To run the server with the dev-tools disabled, run:

```bash
$ DEBUG=false npm start
```

To build for production, this command will output optimized production code:

```bash
$ npm run build
```
