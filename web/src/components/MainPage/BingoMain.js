import React from 'react';
import BingoCapsule from './BingoCapsule';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

// css

// component
function BingoInfo({ bingo }) {
  const { title, plays, thumbnail_src, id } = bingo;

  const shareBingo = () => {
    alert(`"${title}"의 공유하기 버튼을 누르셨습니다.`);
  };

  return (
    <BingoCapsule>
      <img src={thumbnail_src} style={{ width: 250, height: 250 }} alt="bingo thumbnail" />
      <br />
      <span>
        {title} - 조회수 {plays}회
      </span>
      <br />
      <Button
        component={Link}
        size="small"
        variant="contained"
        color="primary"
        to={`/bingo/${id}/play`}
      >
        시작하기
      </Button>
      &nbsp;
      <Button size="small" variant="contained" color="secondary" onClick={shareBingo}>
        공유하기
      </Button>
    </BingoCapsule>
  );
}

export default BingoInfo;
