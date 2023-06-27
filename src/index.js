import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
// Redux 관련 불러오기
import { Provider ,store } from 'react-redux';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
