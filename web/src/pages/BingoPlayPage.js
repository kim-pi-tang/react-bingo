import React, { useCallback, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Collapse, Container, Paper, Typography } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import { styled } from '@material-ui/core/styles';
import { useBingoState, useBingoDispatch, getBingo, refreshBingo } from '../contexts/BingoContext';
import BingoBoard from '../components/BingoBoard';

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

const CountContainer = styled(Paper)({
  marginTop: '1rem',
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
});

const SaveButton = styled(Button)({
  marginTop: '1rem',
});

function BingoPlayPage() {
  const { id } = useParams();
  const history = useHistory();
  const state = useBingoState();
  const dispatch = useBingoDispatch();

  useEffect(() => {
    getBingo(dispatch, id);
  }, [dispatch, id]);

  const { loading, data, error } = state.bingo;
  const { progress } = state;

  // 결과보기 버튼 클릭시 호출할 함수.
  const onSave = useCallback(async () => {
    dispatch({ type: 'SUBMIT_BINGO_RESULT' });
    await refreshBingo(dispatch, id);
    history.push(`/bingo/${id}/result`);
  }, [dispatch, id, history]);

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
        <BingoBoard board={data.board} size={data.size} playable progress={progress} />
        <Collapse in={progress.bingoCount > 0}>
          <CountContainer elevation={3}>
            <Typography>{progress.bingoCount} 빙고!</Typography>
          </CountContainer>
        </Collapse>
        <SaveButton
          variant="contained"
          color="primary"
          size="large"
          startIcon={<DoneIcon />}
          fullWidth
          onClick={onSave}
        >
          결과보기
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
