import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { UserProvider } from './contexts/UserProvider';
import App from './App';
import client from './utils/ApolloClient';
import './styles.scss';
import theme from './utils/theme';

/* Allow all components to access Material UI theme context, Apollo-Client context, and custom User context */
/* This is done by wrapping App.js within all providers */
ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <ApolloProvider client={client}>
      <UserProvider>
        <App />
      </UserProvider>
    </ApolloProvider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
