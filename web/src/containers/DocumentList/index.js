import React from 'react';

const DocumentList = ({ documents, loading, onDelete }) => {
  if (loading) return null;

  return documents.map(({ name, id }) => (
    <div key={`document__${id}`} onClick={() => onDelete(id)}>
      {name}
    </div>
  ));
};

export default DocumentList;
