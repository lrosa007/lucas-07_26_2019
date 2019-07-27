import React from 'react';

// Utils
import { usePrettyBytes } from 'utils/hooks';

// Styles
import styles from './styles.module.css';

const Document = ({ name, size, onDelete }) => {
  const prettyBytes = usePrettyBytes(size);

  return (
    <div className={styles.document}>
      <div className={styles.info}>
        <span className={styles.name}>{name}</span>
        <span className={styles.size}>{prettyBytes}</span>
      </div>
      <button className={styles.button} onClick={onDelete}>
        delete
      </button>
    </div>
  );
};

export default Document;
