import React from 'react';
import {Provider} from 'react-redux';
import configureStore from '../store/configureStore';
import Home from '../components/Home';
import DevTools from '../utils/DevTools';

const store = configureStore();

export default React.createClass({
  render() {
    return (
      <div>

        {/* <Home /> is your app entry point */}
        <Provider store={store}>
          <Home />
        </Provider>
        <DevTools store={store}/>
      </div>
    );
  }
});
