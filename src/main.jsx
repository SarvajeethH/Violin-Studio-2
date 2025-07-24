import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// This is the most important line for styling.
// It tells the app to load and use your CSS rules.
import './App.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
