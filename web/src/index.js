import React from 'react';
import ReactDOM from 'react-dom';

// Styles
import './index.css';

// Containers
import App from 'containers/App';

import * as serviceWorker from 'utils/serviceWorker';

const ROOT = document.getElementById('root');

ReactDOM.render(<App />, ROOT);

serviceWorker.register();
