// React
import React, { Component } from 'react';
import { connect } from 'react-redux';
// Layer
import { connectTypingIndicator } from 'layer-react';
// App
import listStyles from './../MessagesList.css';
import TypingIndicator from './TypingIndicator';

/*
 TODO: Remove !important and get multiple files in TypingIndicatorManager
 */
function mapStateToProps({ LayerUsers }) {
  return {
    layerUsers: LayerUsers,
  };
}

class TypingIndicatorManager extends Component {
  renderTypingIndicators() {
    const { layerUsers, typing, requestScrollDown } = this.props;
    let layerUser, key, isVisible;
    return Object.keys(layerUsers).map((k)=> {
      layerUser = layerUsers[k];
      key = layerUser.layerId;
      isVisible = typing.includes(key);
      return (
        <TypingIndicator
          isVisible={isVisible}
          key={key}
          user={layerUser}
          requestScrollDown={requestScrollDown}
        />
      )
    });
  }

  render() {
    return (
      <div className={listStyles.list}>
        { this.renderTypingIndicators() }
      </div>
    );
  };
}

export default connect(mapStateToProps, null)(
  connectTypingIndicator()(TypingIndicatorManager)
);
