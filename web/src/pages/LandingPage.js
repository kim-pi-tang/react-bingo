import React from 'react';
import { useAsync } from 'react-async';
import { Button, Typography } from '@material-ui/core';
import BingoMain from '../components/MainPage/BingoMain';
import { getDataFromUrl } from '../utils/PageUtil';

// CSS

// COMPONENT
function LandingPage() {
  const { data, error, isLoading, reload } = useAsync({ promiseFn: getDataFromUrl, url: 'bingos' });

  const dataList = data ? data.map((bingo) => <BingoMain key={bingo.id} bingo={bingo} />) : null;

  return (
    <>
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
export default LandingPage;
