import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  Typography,
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { Create, Done, Link, RotateLeft, Share } from '@material-ui/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useBingoContext, getBoardData, submitProgress } from '../contexts/BingoContext';
import BingoBoard from '../components/BingoBoard';

const CountContainer = styled(Paper)({
  marginTop: '1rem',
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
});

function SaveButton({ onSave, disabled }) {
  return (
    <>
      <Grid item sm={3} />
      <Grid item xs={12} sm={6}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<Done />}
          fullWidth
          style={{ marginTop: '0.5rem' }}
          onClick={onSave}
          disabled={disabled}
        >
          결과보기
        </Button>
      </Grid>
      <Grid item sm={3} />
    </>
  );
}

function ResultButton({ shareLink }) {
  const history = useHistory();
  const [isSnackOpen, setSnackOpen] = useState(false);

  const onClickShareLink = () => {
    // 클립보드에 복사
    setSnackOpen(true);
  };
  const onCloseShareLink = () => {
    setSnackOpen(false);
  };

  return (
    <>
      <Grid item xs={12} sm={6}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<RotateLeft />}
          fullWidth
          onClick={() => history.push('/')}
        >
          빙고 목록으로
        </Button>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button variant="contained" color="primary" size="large" startIcon={<Create />} fullWidth>
          빙고 제작
        </Button>
      </Grid>
      <Grid item xs={12}>
        <CopyToClipboard text={shareLink}>
          <IconButton onClick={onClickShareLink}>
            <Link />
          </IconButton>
        </CopyToClipboard>
        <IconButton>
          <Share />
        </IconButton>
        <IconButton>
          <Share />
        </IconButton>
        <IconButton>
          <Share />
        </IconButton>
        <IconButton>
          <Share />
        </IconButton>
        <IconButton>
          <Share />
        </IconButton>
        <Snackbar
          open={isSnackOpen}
          autoHideDuration={3000}
          onClose={onCloseShareLink}
          message="빙고 주소가 복사되었습니다."
        />
      </Grid>
    </>
  );
}

function BingoPlayPage() {
  const { id } = useParams();
  const [state, dispatch] = useBingoContext();
  const [isResult, setResult] = useState(false);

  useEffect(() => {
    getBoardData(dispatch, id, true);
  }, [dispatch, id]);

  const { connection, bingo, progress } = state;
  const { loading, error } = connection;
  const { totalCount } = progress;
  const shareURL = `${window.location.origin}/bingo/${id}`;

  // 결과보기 버튼 클릭시 호출할 함수.
  const onSave = useCallback(async () => {
    await submitProgress(progress, dispatch, id);
    setResult(true);
  }, [progress, dispatch, id]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading && !bingo) {
    return (
      <Box top={0} bottom={0} left={0} right={0} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid container spacing={2} align="center">
      <Grid item xs={12}>
        <BingoBoard data={bingo} progress={progress} playable={!isResult} />
      </Grid>
      <Grid item sm={3} />
      <Grid item xs={12} sm={6}>
        <Collapse in={totalCount > 0}>
          <CountContainer elevation={3}>
            <Typography>{totalCount} 빙고!</Typography>
          </CountContainer>
        </Collapse>
      </Grid>
      <Grid item sm={3} />
      {!isResult && <SaveButton onSave={onSave} disabled={loading} />}
      {isResult && <ResultButton shareLink={shareURL} />}
    </Grid>
  );
}

export default BingoPlayPage;
