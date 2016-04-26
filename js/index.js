import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';

class WebMessenger {
    render(selector, opts = {}) {
        ReactDOM.render(<App clientUser={opts.clientUser} />,
          document.getElementById(selector));
    }
}

var webMessenger = new WebMessenger();
module.exports = webMessenger;