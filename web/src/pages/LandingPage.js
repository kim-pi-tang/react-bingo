import React, { useEffect } from 'react';
import axios from 'axios';
import { useAsync } from 'react-async';
import { Button, Typography } from '@material-ui/core';
import { serverBaseUrl } from '../utils/config';

function LandingPage(props) {
  const { data, error, isLoading, reload } = useAsync({ promiseFn: fetchBingos });

  useEffect(() => {
    fetchBingos();
  }, []);

  const dataList = data ? data.map((bingo) => <BingoInfo key={bingo.id} bingo={bingo} />) : null;

  return (
    <>
      <Typography variant="h3">반갑다 세상</Typography>
      <Typography variant="body1">시작한다 개발</Typography>
      <Typography variant="subtitle1">
        {isLoading && <div>로딩중 ...</div>}
        {data && dataList}
        {error && !isLoading && (
          <>
            <div>오류났음 ㅜ</div>
            <Button variant="contained" color="primary" onClick={reload}>
              재시도
            </Button>
          </>
        )}
      </Typography>
    </>
  );
}

async function fetchBingos() {
  const response = await axios.get(`${serverBaseUrl}/bingos`);
  return response.data;
}

// 그냥 테스트용 컴포넌트임, 웬만하면 components에 컴포넌트 작성 후 import해서 사용.
function BingoInfo({ bingo }) {
  const { id, title, views, thumbnail_src } = bingo;
  return (
    <>
      <img src={thumbnail_src} style={{ width: 50, height: 50 }} alt="bingo thumbnail" />
      <span>
        ({id}) {title} - 조회수 {views}회
      </span>
      <br />
    </>
  );
}

export default LandingPage;
