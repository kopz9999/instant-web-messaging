import React, { Component } from 'react';

export default class MessengerProvider extends Component {
  render() {
    const { clientUser } = this.props;
    const childrenWithProps = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, { clientUser }));
    return (
      <div>
        {childrenWithProps}
      </div>
    );
  }
};
