import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './containers/App/App';
import * as serviceWorker from './serviceWorker';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true; // material-ui: Migration to typography v2

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
