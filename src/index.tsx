import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import reducers from './modules';

import { composeWithDevTools } from 'redux-devtools-extension';
const store = createStore(reducers, composeWithDevTools());

// const loggerMiddleware = createLogger();

// const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
