import { createMuiTheme } from '@material-ui/core/styles';

// 커스텀 Material UI 테마.
export const theme = createMuiTheme({
  typography: {
    fontFamily: 'NanumBarunGothic',
  },
  palette: {
    primary: {
      main: '#4db6ac',
      contrastText: '#fafafa',
    },
    secondary: {
      main: '#6200ea',
    },
  },
  spacing: (factor) => `${0.25 * factor}rem`,
});
