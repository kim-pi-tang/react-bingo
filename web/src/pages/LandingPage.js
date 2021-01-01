import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import { Typography } from '@material-ui/core';
import { serverBaseUrl } from '../utils/config';

function LandingPage(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { loading, data, error } = state;

  const fetchBingos = async () => {
    dispatch({ type: 'LOADING' });
    try {
      const response = await axios.get(`${serverBaseUrl}/bingos`);
      dispatch({ type: 'SUCCESS', data: response.data });
    } catch (e) {
      dispatch({ type: 'ERROR', error: e });
    }
  };

  useEffect(() => {
    fetchBingos();
  }, []);

  const dataList = data ? data.map((bingo) => <BingoInfo key={bingo.id} bingo={bingo} />) : null;

  return (
    <>
      <Typography variant="h3">반갑다 세상</Typography>
      <Typography variant="body1" paragraph>
        시작한다 개발
      </Typography>
      <Typography variant="body2">
        {loading && '로딩중 ...'}
        {data && dataList}
        {error && '오류났음 ㅜ'}
      </Typography>
    </>
  );
}

// API 로딩 상태 관리용 리듀서.
function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      console.log('LOADING ...');
      return {
        loading: true,
        data: null,
        error: null,
      };
    case 'SUCCESS':
      console.log(action.data);
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case 'ERROR':
      console.log(action.error);
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// 로딩 상태 초기값.
const initialState = {
  loading: false,
  data: null,
  error: null,
};

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
