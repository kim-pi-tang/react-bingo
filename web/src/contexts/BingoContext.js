import React, { createContext, useContext, useReducer } from 'react';
import axios from 'axios';
import { serverBaseUrl } from '../utils/config';

const initialState = {
  bingo: {
    loading: false,
    data: null,
    error: null,
  },
  progress: {
    boardStatus: null,
    bingoCount: null,
    bingoLines: null,
    boardSize: null,
  },
};

const loadingState = {
  loading: true,
  data: null,
  error: null,
};

const successState = (data) => ({
  loading: false,
  data,
  error: null,
});

const errorState = (error) => ({
  loading: false,
  data: null,
  error,
});

function bingoReducer(state, action) {
  switch (action.type) {
    case 'GET_BINGO':
      return {
        ...state,
        bingo: loadingState,
      };
    case 'GET_BINGO_SUCCESS':
      const boardSize = action.data.size;
      const statusArray = new Array(boardSize * boardSize).fill(false);

      return {
        ...state,
        bingo: successState(action.data),
        progress: {
          ...state.progress,
          boardSize,
          boardStatus: statusArray,
          bingoCount: 0,
        },
      };
    case 'GET_BINGO_REFRESH_SUCCESS':
      return {
        ...state,
        bingo: successState(action.data),
      };
    case 'GET_BINGO_ERROR':
      return {
        ...state,
        bingo: errorState(action.error),
      };
    case 'UPDATE_BINGO_PROGRESS':
      const boardStatus = updateBoardStatus(state.progress, action.index);
      const { totalCount, bingoLines } = updateBingoCount(boardStatus, state.progress.boardSize);
      return {
        ...state,
        progress: {
          ...state.progress,
          boardStatus,
          bingoCount: totalCount,
          bingoLines,
        },
      };
    case 'SUBMIT_BINGO_RESULT':
      // TODO(mskwon1): 서버쪽으로 데이터 보내고 결과 받는 부분 구현.
      console.log('result submitted');
      return {
        ...state,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function updateBoardStatus(progress, updateIndex) {
  const boardStatus = progress.boardStatus.map((value, index) => {
    if (index === updateIndex) {
      return !value;
    }
    return value;
  });

  return boardStatus;
}

function updateBingoCount(boardStatus, boardSize) {
  const bingoLines = { h: [], v: [], d: [] };
  let totalCount = 0;

  // 가로줄 검사.
  for (let i = 0; i < boardStatus.length; i += boardSize) {
    let rowCount = 0;
    for (let j = 0; j < boardSize; j++) {
      if (boardStatus[i + j]) {
        rowCount++;
      }
    }
    if (rowCount === boardSize) {
      totalCount++;
      bingoLines['h'].push(i / boardSize + 1);
    }
  }

  // 세로줄 검사.
  for (let i = 0; i < boardSize; i++) {
    let colCount = 0;
    for (let j = 0; j < boardStatus.length; j += boardSize) {
      if (boardStatus[i + j]) {
        colCount++;
      }
    }
    if (colCount === boardSize) {
      totalCount++;
      bingoLines['v'].push(i + 1);
    }
  }

  // 우하향 대각선 검사.
  let diagDownCount = 0;
  for (let i = 0; i < boardStatus.length; i += boardSize + 1) {
    if (boardStatus[i]) {
      diagDownCount++;
    }
  }
  if (diagDownCount === boardSize) {
    totalCount++;
    bingoLines['d'].push(1);
  }

  let diagUpCount = 0;
  // 우상향 대각선 검사.
  for (let i = boardSize - 1; i < boardStatus.length - boardSize + 1; i += boardSize - 1) {
    if (boardStatus[i]) {
      diagUpCount++;
    }
  }
  if (diagUpCount === boardSize) {
    totalCount++;
    bingoLines['d'].push(2);
  }

  return {
    bingoLines,
    totalCount,
  };
}

const BingoStateContext = createContext();
const BingoDispatchContext = createContext();

export function BingoProvider({ children }) {
  const [state, dispatch] = useReducer(bingoReducer, initialState);

  return (
    <BingoStateContext.Provider value={state}>
      <BingoDispatchContext.Provider value={dispatch}>{children}</BingoDispatchContext.Provider>
    </BingoStateContext.Provider>
  );
}

export function useBingoState() {
  const context = useContext(BingoStateContext);
  if (!context) {
    throw new Error('Cannot find BingoProvider');
  }
  return context;
}

export function useBingoDispatch() {
  const context = useContext(BingoDispatchContext);
  if (!context) {
    throw new Error('Cannot find BingoProvider');
  }
  return context;
}

/**
 * 빙고 데이터 받아올 때 사용(progress 초기화됨).
 * @param {Function} dispatch 컨텍스트 디스패쳐
 * @param {Number} id 받아올 빙고 id
 */
export async function getBingo(dispatch, id) {
  dispatch({ type: 'GET_BINGO' });
  try {
    const response = await axios.get(`${serverBaseUrl}/bingos/${id}`);
    dispatch({ type: 'GET_BINGO_SUCCESS', data: response.data });
  } catch (error) {
    dispatch({ type: 'GET_BINGO_ERROR', error });
  }
}

/**
 * progress 안건드리고 bingo 데이터 다시 받아올 때 사용하세요.
 * @param {Function} dispatch 컨텍스트 디스패쳐
 * @param {Number} id 빙고 id
 */
export async function refreshBingo(dispatch, id) {
  dispatch({ type: 'GET_BINGO' });
  try {
    const response = await axios.get(`${serverBaseUrl}/bingos/${id}`);
    dispatch({ type: 'GET_BINGO_REFRESH_SUCCESS', data: response.data });
  } catch (error) {
    dispatch({ type: 'GET_BINGO_ERROR', error });
  }
}
