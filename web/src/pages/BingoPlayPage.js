import React, { useCallback, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Collapse, Container, Grid, Paper, Typography } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import { styled } from '@material-ui/core/styles';
import { useBingoState, useBingoDispatch, getBingo, refreshBingo } from '../contexts/BingoContext';
import BingoBoard from '../components/BingoBoard';

const CountContainer = styled(Paper)({
  marginTop: '1rem',
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
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
    return (
      <Grid container spacing={2} align="center">
        <Grid item xs={12}>
          <Typography variant="h3">{data.title}</Typography>
          <Typography variant="subtitle1">{data.description}</Typography>
        </Grid>
        <Grid item xs={12}>
          <BingoBoard board={data.board} size={data.size} playable progress={progress} />
        </Grid>
        <Grid item sm={3} />
        <Grid item xs={12} sm={6}>
          <Collapse in={progress.bingoCount > 0}>
            <CountContainer elevation={3}>
              <Typography>{progress.bingoCount} 빙고!</Typography>
            </CountContainer>
          </Collapse>
        </Grid>
        <Grid item sm={3} />
        <Grid item xs={12} style={{ padding: '0.5rem' }} />
        <Grid item sm={3} />
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<DoneIcon />}
            fullWidth
            onClick={onSave}
          >
            결과보기
          </Button>
        </Grid>
        <Grid item sm={3} />
      </Grid>
    );
  } else {
    return (
      <Container maxWidth="sm">
        {loading && <div>Loading</div>}
        {error && <div>Error: {error.message}</div>}
      </Container>
    );
  }
}

export default BingoPlayPage;
