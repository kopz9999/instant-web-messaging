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
  renderCloseButton() {
    const { actions } = this.props;
    return (
      <a className={styles.closeButton}
         href="#"
         onClick={actions.hideContainer}
      >
        <div className={styles.icon}></div>
      </a>
    );
  }

  render() {
    const { clientUser, displayHeader } = this.props;

    return (
      <div>
        <div className={styles.header}>
          { this.renderCloseButton() }
        </div>
        <DetailedHeader
          displayHeader={displayHeader}
          clientUser={clientUser}
          renderCloseButton={ this.renderCloseButton.bind(this) }
        />
      </div>
    );
  };
};

export default connect(null, mapDispatchToProps)(Header);
