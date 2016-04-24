import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';

class WebMessenger {
    render(selector) {
        ReactDOM.render(<App />, document.getElementById(selector));
    }
}

var webMessenger = new WebMessenger();
module.exports = webMessenger;