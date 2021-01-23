import React, { useState } from 'react';
import {
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from '@material-ui/core';
import { useBingoState } from '../contexts/BingoContext';
import BingoBoard from '../components/BingoBoard';
import { Create, RotateLeft, Share } from '@material-ui/icons';
import { useHistory, useParams } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function BingoResultPage() {
  const history = useHistory();
  const state = useBingoState();
  const { id } = useParams();

  const { loading, data, error } = state.bingo;
  const { progress } = state;

  const [snack, setSnack] = useState(false);

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
          <Container maxWidth={maxWidth}>
            <BingoBoard board={data.board} size={data.size} progress={progress} />
          </Container>
        </Grid>
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
            <TextField
              label="주소 공유"
              defaultValue={shareURL}
              InputProps={{ readOnly: true }}
              fullWidth
              onClick={onShareLink}
            />
          </CopyToClipboard>
          <Snackbar
            open={snack}
            autoHideDuration={3000}
            onClose={onCloseShareLink}
            message="빙고 주소가 복사되었습니다."
          />
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Paper>
        {loading && <div>Loading</div>}
        {error && <div>Error: {error.message}</div>}
      </Paper>
    );
  }
}

export default BingoResultPage;
