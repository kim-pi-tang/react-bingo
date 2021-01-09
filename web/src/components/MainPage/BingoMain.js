import React from 'react';
import BingoCapsule from './BingoCapsule';
import Button from '@material-ui/core/Button';

function BingoInfo({ bingo }) {
  const { title, plays, thumbnail_src } = bingo;

  return (
    <BingoCapsule>
      <span style={{ display: 'inline-block' }}>
        <img src={thumbnail_src} style={{ width: 250, height: 250 }} alt="bingo thumbnail" />
        <br />
        <span>
          {title} - 조회수 {plays}회
        </span>
        <br />
        <Button size="small" variant="contained" color="primary">
          시작하기
        </Button>
        &nbsp;
        <Button size="small" variant="contained" color="secondary">
          공유하기
        </Button>
      </span>
    </BingoCapsule>
  );
}

export default BingoInfo;
