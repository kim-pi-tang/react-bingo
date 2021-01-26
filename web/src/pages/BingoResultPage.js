import React, { useState } from 'react';
import {
  Button,
  Collapse,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  styled,
  Typography,
} from '@material-ui/core';
import { useBingoState } from '../contexts/BingoContext';
import BingoBoard from '../components/BingoBoard';
import { Create, Link as LinkIcon, RotateLeft, Share } from '@material-ui/icons';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const CountContainer = styled(Paper)({
  marginTop: '1rem',
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
});

function BingoResultPage() {
  const history = useHistory();
  const state = useBingoState();
  const { id } = useParams();

  const { data } = state.bingo;
  const { progress } = state;

  const [isSnackOpen, setSnack] = useState(false);

  if (data) {
    const shareURL = `${window.location.origin}/bingo/${id}`;

    const onShareLink = () => {
      // 클립보드에 복사
      setSnack(true);
    };
    const onCloseShareLink = () => {
      setSnack(false);
    };

    return (
      <Grid container spacing={2} align="center">
        <Grid item xs={12}>
          <Typography variant="h3">{data.title}</Typography>
          <Typography variant="subtitle1">{data.description}</Typography>
        </Grid>
        <Grid item xs={12}>
          <BingoBoard board={data.board} size={data.size} progress={progress} />
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
        <Grid item xs={12} style={{ padding: '1rem' }} />
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
          <CopyToClipboard text={shareURL}>
            <IconButton onClick={onShareLink}>
              <LinkIcon />
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
      </Grid>
    );
  } else {
    return <Redirect to={`/bingo/${id}`} />;
  }
}

export default BingoResultPage;
