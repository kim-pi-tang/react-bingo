import React from 'react';
import { Box, Typography, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

function BingoCell({ index, cell }) {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.only('xs'));

  return (
    <Box
      px={1}
      borderLeft={1}
      height="100%"
      display="flex"
      textAlign="center"
      justifyContent="center"
      alignItems="center"
      style={{ wordBreak: xs ? 'normal' : 'keep-all' }}
    >
      <Typography variant="body2">{cell.title}</Typography>
    </Box>
  );
}

export default BingoCell;
