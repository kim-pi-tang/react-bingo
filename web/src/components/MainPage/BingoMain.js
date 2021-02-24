import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';

// css
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-block',
    textAlign: 'center',
    padding: '5px',
    '& > * > *': {
      margin: theme.spacing(1),
    },
    '&:hover': { background: '#efefef' },
  },
}));

// component
function BingoInfo({ bingo }) {
  const { title, plays, thumbnail_src, id } = bingo;

  const classes = useStyles();

  const shareBingo = () => {
    alert(`"${title}"의 공유하기 버튼을 누르셨습니다.`);
  };

  return (
    <div className={classes.root}>
      <Box>
        <img src={thumbnail_src} style={{ width: 250, height: 250 }} alt="bingo thumbnail" />
      </Box>
      <Box>
        {title} - 조회수 {plays}회
      </Box>
      <Box>
        <Button
          component={Link}
          size="small"
          variant="contained"
          color="primary"
          to={`/bingo/${id}/play`}
        >
          시작하기
        </Button>
        <Button size="small" variant="contained" color="secondary" onClick={shareBingo}>
          공유하기
        </Button>
      </Box>
    </div>
  );
}

export default BingoInfo;
