import { createMuiTheme } from '@material-ui/core/styles';

/* Define branding and colors to be shared across application */
/* Define custom components to be shared across application */
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#cccccc',
      main: '#67c97a'
    }
  },
  overrides: {
    MuiTextField: {
      root: {
        display: 'inline-block'
      }
    }
  }
});

export default theme;
