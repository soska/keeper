import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
// import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './data/create-store';

console.log(store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
