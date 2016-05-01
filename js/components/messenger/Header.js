import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// App
import styles from './Header.css';
import * as ContainerActions from '../../actions/ContainerActions';

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
    const { clientUser } = this.props;
    return (
      <div>
        <div className={styles.header}>
          { this.renderCloseButton() }
        </div>
        <div className={`${styles.header} ${styles.hide}`}>
          <div className={styles.description}>
            <img src={clientUser.avatar.url} className={styles.avatar}/>
            <div className={styles.body}>
              <div className={styles.name}>{clientUser.displayName}</div>
              <div className={styles.roleName}>{clientUser.roleName}</div>
            </div>
          </div>
          { this.renderCloseButton() }
        </div>
      </div>
    );
  };
};

export default connect(null, mapDispatchToProps)(Header);
