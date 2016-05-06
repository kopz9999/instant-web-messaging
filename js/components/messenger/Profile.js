import React, { PropTypes } from 'react';
import styles from './Profile.css';

export default ({ clientUser }) => (
  <div className={styles.profile}>
    <div className={styles.dataContainer}>
      <div className={styles.data}>
        <div className={styles.info}>
          <div className={styles.avatar}>
            <img src={clientUser.avatarURL} />
          </div>
          <div className={styles.name}>
            { clientUser.displayName }
          </div>
          <div className={styles.title}>
            { clientUser.roleName }
          </div>
          <div className={styles.separator}>&nbsp;</div>
        </div>
      </div>
    </div>
  </div>
);
