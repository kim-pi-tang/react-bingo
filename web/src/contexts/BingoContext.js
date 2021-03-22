import React, { createContext, useContext, useReducer } from 'react';
import axios from 'axios';
import { serverBaseUrl } from '../utils/config';

const initialState = {
  connection: {
    loading: true,
    error: null,
  },
  bingo: null,
  progress: {
    boardSize: null,
    isCellSelected: null,
    totalCount: null,
    lineCounts: null,
  },
};

function bingoReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        connection: {
          loading: true,
          error: null,
        },
      };
    case 'SET_ERROR':
      return {
        ...state,
        connection: {
          loading: false,
          error: action.error,
        },
      };
    case 'SET_BINGO_DATA':
      const boardSize = action.data.size;
      const initializedCellList = new Array(boardSize * boardSize).fill(false);

      return {
        ...state,
        connection: {
          loading: false,
          error: null,
        },
        bingo: action.data,
        progress: {
          ...state.progress,
          boardSize,
          isCellSelected: initializedCellList,
          totalCount: 0,
        },
      };
    case 'UPDATE_BINGO_DATA':
      return {
        ...state,
        connection: {
          loading: false,
          error: null,
        },
        bingo: action.data,
      };
    case 'UPDATE_PROGRESS':
      const updatedCellList = updateCellState(state.progress, action.index);
      const { totalCount, lineCounts } = getBingoCount(updatedCellList, state.progress.boardSize);
      return {
        ...state,
        progress: {
          ...state.progress,
          isCellSelected: updatedCellList,
          totalCount,
          lineCounts,
        },
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function updateCellState(progress, updateIndex) {
  const isCellSelected = progress.isCellSelected.map((value, index) => {
    if (index === updateIndex) {
      return !value;
    }
    return value;
  });

  return isCellSelected;
}

function getBingoCount(cellList, boardSize) {
  const lineCounts = { h: [], v: [], d: [] };
  let totalCount = 0;

  // 가로줄 검사.
  for (let i = 0; i < cellList.length; i += boardSize) {
    let rowCount = 0;
    for (let j = 0; j < boardSize; j++) {
      if (cellList[i + j]) {
        rowCount++;
      }
    }
    if (rowCount === boardSize) {
      totalCount++;
      lineCounts['h'].push(i / boardSize + 1);
    }
  }

  // 세로줄 검사.
  for (let i = 0; i < boardSize; i++) {
    let colCount = 0;
    for (let j = 0; j < cellList.length; j += boardSize) {
      if (cellList[i + j]) {
        colCount++;
      }
    }
    if (colCount === boardSize) {
      totalCount++;
      lineCounts['v'].push(i + 1);
    }
  }

  // 우하향 대각선 검사.
  let diagDownCount = 0;
  for (let i = 0; i < cellList.length; i += boardSize + 1) {
    if (cellList[i]) {
      diagDownCount++;
    }
  }
  if (diagDownCount === boardSize) {
    totalCount++;
    lineCounts['d'].push(1);
  }

  let diagUpCount = 0;
  // 우상향 대각선 검사.
  for (let i = boardSize - 1; i < cellList.length - boardSize + 1; i += boardSize - 1) {
    if (cellList[i]) {
      diagUpCount++;
    }
  }
  if (diagUpCount === boardSize) {
    totalCount++;
    lineCounts['d'].push(2);
  }

  return {
    totalCount,
    lineCounts,
  };
}

const BingoContext = createContext();

export function BingoProvider({ children }) {
  const [state, dispatch] = useReducer(bingoReducer, initialState);

  return <BingoContext.Provider value={[state, dispatch]}>{children}</BingoContext.Provider>;
}

export function useBingoContext() {
  const [state, dispatch] = useContext(BingoContext);

  if (!state || !dispatch) {
    throw new Error('Cannot find BingoProvider');
  }
  return [state, dispatch];
}

/**
 * 빙고 데이터 받아올 때 사용
 * @param {Function} dispatch 컨텍스트 디스패쳐
 * @param {Number} id 받아올 빙고 id
 * @param {Boolean} [isFirst] 데이터를 처음 받는지 여부(progress 초기화 여부)
 */
export async function getBoardData(dispatch, id, isFirst) {
  dispatch({ type: 'SET_LOADING' });
  try {
    const response = await axios.get(`${serverBaseUrl}/bingos/${id}`);
    const actionType = isFirst ? 'SET_BINGO_DATA' : 'UPDATE_BINGO_DATA';

    dispatch({ type: actionType, data: response.data });
  } catch (error) {
    dispatch({ type: 'SET_ERROR', error });
  }
}

export async function submitProgress(progress, dispatch, id) {
  dispatch({ type: 'SET_LOADING' });
  try {
    /*
    response에 새 통계 데이터를 담을 지, 기존 getBoardData를 재활용할지 결정할 필요 있음
    
    제안 1. 완료 후 별도로 getBoardData() 호출로 최신화
    const response = await axios.post(`${serverBaseUrl}/bingos/${id}/submit`, progress);
    // response.data = { status: 'OK' } or { status: 'ERROR', error: { ... } }
    if(reponse.data.status !== 'OK') throw response.data.error;
    dispatch({ type: 'SET_COMPLETE' }); // Reducer에 해당 action.type 정의 필요
    
    제안 2. 기존의 UPDATE_BINGO_DATA로 즉시 처리
    const response = await axios.post(`${serverBaseUrl}/bingos/${id}/submit`, progress);
    // repsonse.data = { status: 'OK', bingo: { ... } } or { status: 'ERROR', error: { ... } }
    if(reponse.data.status !== 'OK') throw response.data.error;
    dispatch({ type: 'UPDATE_BINGO_DATA', response.data.bingo });
    */
    console.log('result submitted');
  } catch (error) {
    dispatch({ type: 'SET_ERROR', error });
  }
}
