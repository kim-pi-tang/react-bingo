import React from 'react';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const Wrapper = styled(Box)({
  display: 'inline-block',
  textAlign: 'center',
  padding: '5px',
  '&:hover': { background: '#efefef' },
});

function BingoCapsule({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

export default BingoCapsule;
