import React from 'react';
import { Box, Container } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
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
          <Route path="/bingo">
            <Bingo />
          </Route>
          <Route component={ErrorPage} />
        </Switch>
      </Box>
    </ThemeProvider>
  );
}

function Bingo() {
  const { path } = useRouteMatch();

  return (
    <BingoProvider>
      <Switch>
        <Route exact path={`${path}/:id`}>
          <BingoPlayPage />
        </Route>
        {/* 
          빙고 생성 페이지가 여기 들어가면 좋겠습니다.
        */}
        <Route path={`${path}/:id/play`}>
          <BingoPlayPage />
        </Route>
        {/*
          빙고 결과 페이지가 여기 들어갑니다.
        */}
        <Route component={ErrorPage} />
      </Switch>
    </BingoProvider>
  );
}

export default App;
