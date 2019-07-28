import React, { useState, useEffect } from 'react';

// Containers
import DocumentList from 'containers/DocumentList';
import Upload from 'containers/Upload';

// Components
import Info from 'components/Info';
import Header from 'components/Header';
import Search from 'components/Search';

// Utils
import { searchDocuments, uploadDocuments } from 'utils/api';

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

    searchDocuments(query)
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(e => console.log(e));
  }, [query]);

  return (
    <div className={styles.app}>
      <Header>
        <Upload
          disabled={loading}
          onFilesAdded={files =>
            uploadDocuments(files)
              .then(() => setQuery({ ...query }))
              .catch(e => console.log(e))
          }
        />

        <Search onSubmit={name => setQuery({ ...query, name })} />
      </Header>

      <Info count={count} totalSize={totalSize} />

      <DocumentList
        documents={documents}
        loading={loading}
        refresh={() => setQuery({ ...query })}
      />
    </div>
  );
};

export default App;
