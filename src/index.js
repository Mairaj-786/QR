import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './main.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Elements } from '@stripe/react-stripe-js';

import { store } from './store/store';
import { Provider } from 'react-redux';

import { stripePromise } from './utils/stripe';

const options = {
  // passing the client secret obtained from the server
  clientSecret: process.env.SECRET_KEY,
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
