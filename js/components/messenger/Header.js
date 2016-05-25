import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// App
import styles from './Header.css';
import * as ContainerActions from '../../actions/ContainerActions';
import DetailedHeader from './DetailedHeader';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContainerActions, dispatch),
  };
}

class Header extends Component {
  render() {
    const { clientUser, displayHeader } = this.props;

    return (
      <div>
        <DetailedHeader
          displayHeader={displayHeader}
          clientUser={clientUser}
        />
      </div>
    );
  };
};

export default connect(null, mapDispatchToProps)(Header);
