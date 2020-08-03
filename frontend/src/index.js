import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import NavContextProvider from './contexts/navigation';
import CurUserProvider from './contexts/curUser';


ReactDOM.render(
  <React.StrictMode>
    <CurUserProvider>
    <NavContextProvider>
      <App />
    </NavContextProvider>
    </CurUserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
