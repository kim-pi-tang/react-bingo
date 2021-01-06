import React from 'react';
import { Box, Container } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';
import { theme } from './utils/globalTheme';
import { BingoProvider } from './contexts/BingoContext';
import MainNavigation from './components/MainNavigation';
import BingoPlayPage from './pages/BingoPlayPage';
import ErrorPage from './pages/ErrorPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainNavigation />
      <Box component={Container} maxWidth="xl" my={4}>
        <Switch>
          <Route path="/" exact={true} component={LandingPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/bingo/:id/play">
            <BingoProvider>
              <BingoPlayPage />
            </BingoProvider>
          </Route>
          <Route component={ErrorPage} />
        </Switch>
      </Box>
    </ThemeProvider>
  );
}

export default App;
