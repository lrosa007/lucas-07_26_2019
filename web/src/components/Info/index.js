import React from 'react';

// Styles
import styles from './styles.module.css';

const Info = ({ count, totalSize }) => (
  <div className={styles.info}>
    <span className={styles.count}>{count} documents</span>
    <span className={styles.totalSize}>Total Size: {totalSize}</span>
  </div>
);

export default Info;
