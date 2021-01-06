import React, { createContext, useContext, useReducer } from 'react';
import axios from 'axios';
import { serverBaseUrl } from '../utils/config';

const initialState = {
  bingo: {
    loading: false,
    data: null,
    error: null,
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
      return {
        ...state,
        bingo: successState(action.data),
      };
    case 'GET_BINGO_ERROR':
      return {
        ...state,
        bingo: errorState(action.error),
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
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

export async function getBingo(dispatch, id) {
  dispatch({ type: 'GET_BINGO' });
  try {
    const response = await axios.get(`${serverBaseUrl}/bingos/${id}`);
    dispatch({ type: 'GET_BINGO_SUCCESS', data: response.data });
  } catch (error) {
    dispatch({ type: 'GET_BINGO_ERROR', error });
  }
}
