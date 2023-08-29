import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AppFunctionComp from './AppFunctionComp';
import registerServiceWorker from './registerServiceWorker';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <AppFunctionComp />
  </React.StrictMode>
);
registerServiceWorker();
