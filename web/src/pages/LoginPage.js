import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { getWindowDimensions } from '../utils/PageUtil';

// css

// component
function LoginPage() {
  const boxWidth = getWindowDimensions().width > 410 ? '400px' : getWindowDimensions().width - 50;
  const boxPadding = 4;

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-around">
      <Box width={boxWidth} m={boxPadding}>
        <img
          src="https://mblogthumb-phinf.pstatic.net/20110323_149/yean5rang_1300858060958TRSBY_JPEG/%B1%D7%B7%B1%B0%C7_%BE%F8%B4%D9.jpg?type=w2"
          alt="gonawoo"
          width="100%"
        />
      </Box>
      <Box width={boxWidth} m={boxPadding}>
        <TextField id="standard-full-width" label="아이디" fullWidth />
      </Box>
      <Box width={boxWidth} m={boxPadding}>
        <TextField id="standard-full-width" label="비밀번호" fullWidth />
      </Box>
      <Box width={boxWidth} m={boxPadding}>
        <Button size="small" variant="contained" color="primary" onClick={abc} fullWidth>
          로그인 하기
        </Button>
      </Box>
      <Box width={boxWidth} m={boxPadding}>
        <Button size="small" variant="contained" color="secondary" fullWidth>
          계정 새로 만들기
        </Button>
      </Box>
    </Box>
  );
}

// etc
function abc() {
  console.log('abc');
}

export default LoginPage;
