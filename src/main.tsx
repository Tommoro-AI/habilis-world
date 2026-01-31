import './fonts.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'github-markdown-css/github-markdown.css';
import './markdown.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

