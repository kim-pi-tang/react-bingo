import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import { AppBar, Box, Button, Toolbar, Typography } from '@material-ui/core';
import GridOnOutlinedIcon from '@material-ui/icons/GridOnOutlined';

const CustomToolbar = styled(Toolbar)({
  '& .mainTitle': {
    display: 'inline-flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  '& .sideItem': {
    display: 'flex',
    flex: 1,
  },
  '& .leftItem': {
    justifyContent: 'flex-start',
  },
  '& .rightItem': {
    justifyContent: 'flex-end',
  },
});

function MainNavigation(props) {
  const [isLogin, setIsLogin] = useState(false);

  const toggleLogin = () => {
    setIsLogin((prevLoginState) => setIsLogin(!prevLoginState));
  };

  return (
    <AppBar position="sticky">
      <CustomToolbar variant="dense">
        <Box className="sideItem leftItem"></Box>
        <Box component={Link} className="mainTitle" color="inherit" to="/">
          <Box component={GridOnOutlinedIcon} className="logo" mr={1} mb={0.5} />
          <Typography variant="h6">빙고다</Typography>
        </Box>
        <Box className="sideItem rightItem">
          {/* state 이용 예시, 실제로는 로그인 정보를 context로 관리해야할듯. */}
          {isLogin ? (
            <Button component={Link} color="inherit" to="/logout" onClick={toggleLogin}>
              로그아웃
            </Button>
          ) : (
            <Button component={Link} color="inherit" to="/login" onClick={toggleLogin}>
              로그인
            </Button>
          )}
        </Box>
      </CustomToolbar>
    </AppBar>
  );
}

export default MainNavigation;
