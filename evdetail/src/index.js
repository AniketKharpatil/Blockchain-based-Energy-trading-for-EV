import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import EV from "./EV"
import Test from  "./Testcss";
import Load from './Loading';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Load/>
  </React.StrictMode>
);

reportWebVitals();
