import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, Typography } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import { styled } from '@material-ui/core/styles';
import { useBingoState, useBingoDispatch, getBingo } from '../contexts/BingoContext';
import BingoBoard from '../components/BingoPlayBoard';

const MainContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  textAlign: 'center',
});

const TitleContainer = styled('div')({
  marginTop: '2rem',
  marginBottom: '1rem',
});

const SaveButton = styled(Button)({
  marginTop: '1rem',
});

function BingoPlayPage() {
  const { id } = useParams();
  const state = useBingoState();
  const dispatch = useBingoDispatch();

  useEffect(() => {
    getBingo(dispatch, id);
  }, [dispatch, id]);

  const { loading, data, error } = state.bingo;

  if (data) {
    // 빙고판 사이즈에 따라서 메인 컨테이너 크기 조정.
    let maxWidth;
    if (data.size > 6) {
      maxWidth = 'md';
    } else if (data.size > 4) {
      maxWidth = 'sm';
    } else {
      maxWidth = 'xs';
    }

    return (
      <MainContainer maxWidth={maxWidth}>
        <TitleContainer>
          <Typography variant="h3">{data.title}</Typography>
          <Typography variant="subtitle1">{data.description}</Typography>
        </TitleContainer>
        <BingoBoard board={data.board} size={data.size} />
        <SaveButton
          variant="contained"
          color="primary"
          size="large"
          startIcon={<DoneIcon />}
          fullWidth
        >
          저장하기
        </SaveButton>
      </MainContainer>
    );
  } else {
    return (
      <MainContainer maxWidth="sm">
        {loading && <div>Loading</div>}
        {error && <div>Error: {error.message}</div>}
      </MainContainer>
    );
  }
}

export default BingoPlayPage;
