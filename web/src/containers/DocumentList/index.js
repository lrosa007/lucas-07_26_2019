import React from 'react';

// Components
import Document from 'components/Document';

// Utils
import { deleteDocument } from 'utils/api';

// Styles
import styles from './styles.module.css';

const DocumentList = ({ documents, loading, refresh }) => {
  if (loading) return null;

  return (
    <ul className={styles.documentList}>
      {documents.map(({ id, size, name }) => (
        <Document
          key={`document__${id}`}
          name={name}
          size={size}
          onDelete={() => deleteDocument(id).then(() => refresh())}
        />
      ))}
    </ul>
  );
};

export default DocumentList;
