import React from 'react';
import { Grid } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import BingoCell from './BingoCell';

const GridRow = styled(Grid)({
  minHeight: '100px',
  borderBottom: '1px solid',
});

const Wrapper = styled('div')({
  borderTop: '1px solid',
  borderRight: '1px solid',
});

function BingoBoard({ board, size }) {
  const rows = [];
  let cells = [];
  for (const [index, cell] of board.entries()) {
    cells.push(
      <Grid key={index} item xs zeroMinWidth>
        <BingoCell index={index} cell={cell} />
      </Grid>
    );

    if ((index + 1) % size === 0) {
      rows.push(
        <GridRow key={index} container spacing={0}>
          {cells}
        </GridRow>
      );
      cells = [];
    }
  }

  return <Wrapper>{rows}</Wrapper>;
}

export default BingoBoard;
