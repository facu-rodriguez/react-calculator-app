import 'es5-shim';
import 'es6-shim';
import 'es7-shim';
import 'url-search-params-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from 'redux/store';
import { StylesProvider } from '@material-ui/styles';
import { BrowserRouter as Router } from 'react-router-dom';

import './scss/index.scss';
import './config/analytics';
import './config/i18n';
import { unregister } from './serviceWorker';
import App from './app';

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
unregister();

ReactDOM.render(
  <Router>
    <StylesProvider injectFirst>
      <Provider store={store}>
        <App />
      </Provider>
    </StylesProvider>
  </Router>,
  document.getElementById('root')
);
