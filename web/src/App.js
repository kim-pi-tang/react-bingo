import React from 'react';
import { Container, Typography } from '@material-ui/core';
import styled from 'styled-components';

const MainContainer = styled(Container)`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

function App() {
  return (
    <MainContainer maxWidth="xl">
      <Typography variant="h3">반갑다 세상</Typography>
      <Typography variant="body1" paragraph>
        시작한다 개발
      </Typography>
    </MainContainer>
  );
}

export default App;
