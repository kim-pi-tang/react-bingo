import React from 'react';
import { Box, Container } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { theme } from './utils/globalTheme';
import { BingoProvider } from './contexts/BingoContext';
import MainNavigation from './components/MainNavigation';
import BingoPlayPage from './pages/BingoPlayPage';
import BingoResultPage from './pages/BingoResultPage';
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
          <Route path="/bingo">
            <BingoRouter />
          </Route>
          <Route component={ErrorPage} />
        </Switch>
      </Box>
    </ThemeProvider>
  );
}

function BingoRouter() {
  const { path } = useRouteMatch();

  return (
    <BingoProvider>
      <Switch>
        {/* 
          빙고 생성 페이지가 여기 들어가면 좋겠습니다.
        */}
        <Route exact path={`${path}/:id(\\d+)`}>
          <BingoPlayPage />
        </Route>
        <Route exact path={`${path}/:id(\\d+)/play`}>
          <BingoPlayPage />
        </Route>
        <Route exact path={`${path}/:id(\\d+)/result`}>
          <BingoResultPage />
        </Route>
        <Route component={ErrorPage} />
      </Switch>
    </BingoProvider>
  );
}

export default App;
