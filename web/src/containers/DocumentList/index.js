import React from 'react';

// Components
import Document from 'components/Document';

// Utils
import { deleteDocument } from 'utils/api';

const DocumentList = ({ documents, loading }) => {
  if (loading) return null;

  return documents.map(({ name, id }) => (
    <Document
      key={`document__${id}`}
      name={name}
      onDelete={() => deleteDocument(id)}
    />
  ));
};

export default DocumentList;
