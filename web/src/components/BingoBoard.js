import React from 'react';
import { Container, Grid } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import BingoCell from './BingoCell';

const GridRow = styled(Grid)({
  minHeight: '100px',
  borderBottom: '1px solid',
  borderColor: 'black',
});

const Wrapper = styled('div')({
  borderTop: '1px solid',
  borderRight: '1px solid',
  borderColor: 'black',
});

function BingoBoard({ board, size, playable, progress }) {
  const rows = [];
  let cells = [];
  for (const [index, cell] of board.entries()) {
    cells.push(
      <Grid key={index} item xs zeroMinWidth>
        <BingoCell
          index={index}
          cell={cell}
          playable={playable}
          selected={progress.boardStatus[index]}
        />
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

  // 빙고판 사이즈에 따라서 컨테이너 크기 조정.
  let maxWidth;
  if (size > 6) {
    maxWidth = 'md';
  } else if (size > 4) {
    maxWidth = 'sm';
  } else {
    maxWidth = 'xs';
  }

  return (
    <Container maxWidth={maxWidth}>
      <Wrapper>{rows}</Wrapper>
    </Container>
  );
}

export default BingoBoard;
