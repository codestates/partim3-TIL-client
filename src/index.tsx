import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './modules';

import { HashRouter } from 'react-router-dom';
//yangeok.github.io/react/2019/05/15/react-hashrouter.html

const store = createStore(reducers, composeWithDevTools());
const persistor = persistStore(store);

// const loggerMiddleware = createLogger();

// const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        {/* <HashRouter> */}
        <App />
        {/* </HashRouter> */}
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
