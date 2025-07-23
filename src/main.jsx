import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// This line is essential for loading your styles
import './App.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
