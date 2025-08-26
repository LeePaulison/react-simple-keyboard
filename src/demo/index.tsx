import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const root = document.createElement('div');
root.className = 'root';

const html = document.getElementsByTagName('html')[0];
html.setAttribute('lang', 'en');

document.body.appendChild(root);

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  root
);
