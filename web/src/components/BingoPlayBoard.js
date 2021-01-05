import React from 'react';
import { Grid } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import BingoPlayCell from './BingoPlayCell';

const GridRow = styled(Grid)({
  minHeight: '100px',
  borderBottom: '1px solid',
});

const Wrapper = styled('div')({
  borderTop: '1px solid',
  borderRight: '1px solid',
});

function BingoPlayBoard({ board, size }) {
  const cells = [];
  let grid = [];
  for (const [index, cell] of board.entries()) {
    grid.push(
      <Grid key={index} item xs zeroMinWidth>
        <BingoPlayCell index={index} cell={cell} />
      </Grid>
    );

    if ((index + 1) % size === 0) {
      cells.push(
        <GridRow key={index} container spacing={0}>
          {grid}
        </GridRow>
      );
      grid = [];
    }
  }

  return <Wrapper>{cells}</Wrapper>;
}

export default BingoPlayBoard;
