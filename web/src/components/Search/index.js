import React, { useState } from 'react';

const Search = () => {
  const [name, setName] = useState('');

  return (
    <input
      value={name}
      placeholder="Search documents..."
      onChange={event => setName(event.target.value)}
    />
  );
};

export default Search;
