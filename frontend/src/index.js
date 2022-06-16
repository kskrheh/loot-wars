import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom'
import store from './app/store'
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider>
        <Router>
          <App />
        </Router>
      </CookiesProvider>
    </Provider>
  </React.StrictMode>
);
