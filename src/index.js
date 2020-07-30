import 'es5-shim';
import 'es6-shim';
import 'es7-shim';
import 'url-search-params-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { StylesProvider } from '@material-ui/styles';

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
  <StylesProvider injectFirst>
    <App />
  </StylesProvider>,
  document.getElementById('root')
);
