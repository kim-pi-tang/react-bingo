import React, { useCallback } from 'react';
import { Box, Typography, useMediaQuery } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { useBingoContext } from '../contexts/BingoContext';
import { useTheme } from '@material-ui/core/styles';

const CellWrapper = styled(Box)({
  borderLeft: '1px solid black',
  display: 'flex',
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});

function BingoCell({ index, cell, playable, selected }) {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.only('xs'));

  const [, dispatch] = useBingoContext();

  const onCellClick = useCallback(() => {
    dispatch({ type: 'UPDATE_PROGRESS', index });
  }, [index, dispatch]);

  return (
    <CellWrapper
      px={1}
      style={{ wordBreak: xs ? 'normal' : 'keep-all' }}
      onClick={playable ? onCellClick : null}
      color={selected ? 'primary.contrastText' : 'black'}
      bgcolor={selected ? 'primary.main' : 'white'}
    >
      <Typography variant="body2">{cell.title}</Typography>
    </CellWrapper>
  );
}

export default BingoCell;
