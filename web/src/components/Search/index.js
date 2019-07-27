import React, { useState } from 'react';

// Styles
import styles from './styles.module.css';

const Search = ({ onSubmit }) => {
  const [name, setName] = useState('');

  return (
    <input
      className={styles.search}
      value={name}
      placeholder="Search documents..."
      onChange={event => setName(event.target.value)}
      onKeyDown={event => {
        if (event.key === 'Enter') {
          onSubmit(name);
        }
      }}
    />
  );
};

export default Search;
