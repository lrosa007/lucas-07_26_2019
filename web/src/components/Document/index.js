import React from 'react';

const Document = ({ name, onDelete }) => {
  return <div onClick={onDelete}>{name}</div>;
};

export default Document;
