import React, { useState, useEffect } from 'react';

// Containers
import DocumentList from 'containers/DocumentList';
import Upload from 'containers/Upload';

// Components
import Info from 'components/Info';
import Header from 'components/Header';
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

    searchDocuments(query).then(data => {
      setData(data);
      setLoading(false);
    });
  }, [query]);

  return (
    <div className={styles.app}>
      <Header>
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
      </Header>
      <Info count={count} totalSize={totalSize} />
      <DocumentList documents={documents} loading={loading} />
    </div>
  );
};

export default App;
