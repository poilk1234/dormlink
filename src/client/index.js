import React from 'react';
import ReactDOM from 'react-dom';
import './styles.scss';
import App from './App';
import { UserProvider } from './contexts/UserProvider';

ReactDOM.render(
  <UserProvider>
    <App />
  </UserProvider>,
  document.getElementById('root')
);
