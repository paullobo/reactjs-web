import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './pages/app';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from '../src/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactNotification />
      <App />
    </Provider>,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
