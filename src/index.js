import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import './styles/global.css';

/**
 * Punto de entrada de la aplicación React 17
 * Configura el Provider de Redux y renderiza la aplicación
 */
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
