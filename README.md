
# WebMessenger Library

The webMessenger library provides a module for rendering an Instant Messaging
Application. This is a Web Component that can be integrated in any website.

![Demo](https://s3-us-west-2.amazonaws.com/kopz-projects/Curaytor/Messenger/Demo.gif)

[Live Demo](https://curaytor-web-messaging.herokuapp.com)

## Usage

To display this component in any website, add the following dependencies:

```html
  <!-- Fonts -->
  <link type="text/css" rel="stylesheet" href="https://fast.fonts.net/cssapi/62e9cdee-1429-474a-8e7d-1929c597add2.css"/>
  <!-- Layer Web SDK -->
  <script src='https://cdn.layer.com/sdk/0.9/layer-websdk.min.js'></script>
  <!-- App Bundle -->
  <script src="https://curaytor-web-messaging.herokuapp.com/static/bundle.js"></script>
```

After having the dependencies, the library will be available as "webMessenger"

```js
  var clientUser = new webMessenger.User({
    displayName: 'Margaret Bell',
    roleName: 'Product support',
    layerId: 'Customer Support',
    avatarURL: 'https://s3-us-west-2.amazonaws.com/kopz-projects/Curaytor/Messenger/admin-avatar.png'
  });

  var consumerUser = new webMessenger.User({
    displayName: 'Customer',
    layerId: 'Customer',
    avatarURL: 'https://s3-us-west-2.amazonaws.com/kopz-projects/Curaytor/Messenger/user-avatar-small.png'
  });

  var targetNode = document.getElementById('app-container');

  webMessenger.createApp(targetNode,
    {
      appId: layerAppId,
      challengeCallback: getIdentityToken,
      viewMode: webMessenger.VIEW_MODES.OVERLAY,
      welcomeMessage: 'Hello, I’m Margaret, realtor at Bridgewater, Warren, if you have any questions please feel free to write anytime.',
      messageNotification: 'Hey, let me know if you have any question',
      clientUser: clientUser,
      consumerUser: consumerUser
    }
  );
```

### AMD

RequireJS example:
```js
define(['https://curaytor-web-messaging.herokuapp.com/static/bundle.js'], function (webMessenger) {
    /* webMessenger is available only inside the AMD */

    function myFunc(){};
    return myFunc;
});
```

### CommonJS

```js
var webMessenger = require('webMessenger');
```

### Library

The package contains:

```js
/** @module WebMessenger */

/**
 * @param {DocumentFragment} targetNode Where the component will be rendered
 * @param {Object} opts Application parameters
 * @param {String} opts.appId Layer Application Id
 * @param {Function} opts.challengeCallback Layer Authentication callback
 * The one who should be authenticated is consumerUser
 * @param {VIEW_MODES} opts.viewMode Enumeration to specify how to display
 * the app
 * @param {DocumentFragment} opts.pageContentNode In case of specifying
 * SPLIT mode, this should be the container where the rest of page relies
 * @param {String} opts.welcomeMessage Welcome message from the admin
 * @param {String} opts.messageNotification Initial message notification from
 * the top
 * @param {User} opts.clientUser Admin User on the backend
 * @param {User} opts.consumerUser User who is viewing your app
 * @return {App}
 * */
function createApp(parentNode, opts = {}) {
    /* Rendering logic */
}

/**
 * Enumeration specifying the Available View Modes
 * @enum {String}
 */
const VIEW_MODES = {
  SPLIT: 'split',
  OVERLAY: 'overlay'
};

/**
* The library contains a User class but an anonymous object with the
* same properties can be passed instead
* @class User
*/
class User {
  constructor({displayName, roleName, layerId, avatarURL}) {
    /* Initializes User */
  }

  get displayName() {}

  set displayName(value) {}

  get roleName() {}

  set roleName(value) {}

  get layerId() {}

  set layerId(value) {}

  get avatarURL() {}

  set avatarURL(value) {}
}

```

### Overlay View mode

![Overlay View](https://s3-us-west-2.amazonaws.com/kopz-projects/Curaytor/Messenger/Overlay.gif)

The easier way to render the application, the web component stays over the
web page content.

### Split View Mode

![Split View](https://s3-us-west-2.amazonaws.com/kopz-projects/Curaytor/Messenger/Split.gif)

In order to split the application content when showing the messenger, some
extra steps are required. The following html structure is recommended:

![Split View](https://s3-us-west-2.amazonaws.com/kopz-projects/Curaytor/Messenger/Split-Explanation.gif)

The code:

```js
  webMessenger.createApp(targetNode,
    {
      appId: layerAppId,
      challengeCallback: getIdentityToken,
      viewMode: webMessenger.VIEW_MODES.SPLIT,
      // Extra parameter to specify where the page content is:
      pageContentNode: document.getElementsByClassName("page-content")[0],
      welcomeMessage: 'Hello, I’m Margaret, realtor at Bridgewater, Warren, if you have any questions please feel free to write anytime.',
      messageNotification: 'Hey, let me know if you have any question',
      clientUser: clientUser,
      consumerUser: consumerUser
    }
  );
```

Recommended:

```html
<html class="full" lang="en">
    <body>
        <div class="split-layout">
            <div class="page-content">
            </div>
            <div id="app-container">
            </div>
        </div>
    </body>
</html>
```

```css

.full {
  height: 100%;
}

.split-layout {
  width: 100%;
  min-height: 100%;
  position: relative;
  overflow: hidden;
}

.page-content {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: auto;
}

```

## Running your project

The generated project includes a development server on port `3000`, which will rebuild the app whenever you change application code.
To run the server with the dev-tools disabled, run:

```bash
$ npm start
```

To start the server (with the dev-tools enabled), run:
```bash
$ npm run debug
```

To build for production, this command will output optimized production code:

```bash
$ NODE_ENV=production npm run build
```

## TODO:

- Add Unit Testing
- Add Integration Testing
