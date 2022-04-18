import React from 'react';
import { render } from 'react-dom';
import registerServiceWorker from './swRegister';
import App from './App';

render(
  <>
    <App />
  </>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
registerServiceWorker();
