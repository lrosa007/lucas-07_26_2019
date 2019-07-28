import React from 'react';

// Utils
import { usePrettyBytes } from 'utils/hooks';

// Styles
import styles from './styles.module.css';

const Info = ({ count, totalSize }) => {
  const prettyBytes = usePrettyBytes(totalSize);

  return (
    <div className={styles.info}>
      <span className={styles.count}>{count} documents</span>
      <span className={styles.totalSize}>Total size: {prettyBytes}</span>
    </div>
  );
};

export default Info;
