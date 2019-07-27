import React from 'react';

// Containers
import Upload from 'containers/Upload';

// Utils
import { uploadDocument } from 'utils/api';

// Styles
import styles from './styles.module.css';

const App = () => {
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
      </header>
    </div>
  );
};

export default App;
