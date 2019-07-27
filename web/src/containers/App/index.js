import React, { useState, useEffect } from 'react';

// Containers
import DocumentList from 'containers/DocumentList';
import Upload from 'containers/Upload';

// Components
import Search from 'components/Search';

// Utils
import { uploadDocument, searchDocuments } from 'utils/api';

// Styles
import styles from './styles.module.css';

const App = () => {
  const [query, setQuery] = useState({ name: '' });
  const [loading, setLoading] = useState(false);
  const [{ count, totalSize, documents }, setData] = useState({
    count: 0,
    totalSize: 0,
    documents: [],
  });

  useEffect(() => {
    setLoading(true);

    searchDocuments(query).then(({ data }) => {
      setData({ count: data.length, totalSize: 0, documents: data });
      setLoading(false);
    });
  }, [query]);

  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <Upload
          onFilesAdded={files => {
            try {
              const promises = files.map(file => uploadDocument(file));

              Promise.all(promises);
            } catch (e) {
              console.log(e);
            }
          }}
        />
        <Search onSubmit={name => setQuery({ ...query, name })} />
      </header>
      <h1>{count} Documents</h1>
      <h2>Total Size: {totalSize}</h2>
      <DocumentList documents={documents} loading={loading} />
    </div>
  );
};

export default App;
