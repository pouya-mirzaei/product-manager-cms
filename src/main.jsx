import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { HappyProvider } from '@ant-design/happy-work-theme';

ReactDOM.createRoot(document.querySelector('#root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <HappyProvider>
        <App />
      </HappyProvider>
    </BrowserRouter>
  </React.StrictMode>
);
