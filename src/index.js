import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "./styles/global.css";
import { Provider } from "./Context";
import App from './App';


ReactDOM.render(
  <React.StrictMode>
    <Provider>
        <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
