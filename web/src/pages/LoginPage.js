import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { getWindowDimensions } from '../utils/PageUtil';

// css
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(5),
      width: getWindowDimensions().width > 410 ? '40ch' : getWindowDimensions().width - 50,
    },
  },
}));

// component
function LoginPage() {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <img
        src="https://mblogthumb-phinf.pstatic.net/20110323_149/yean5rang_1300858060958TRSBY_JPEG/%B1%D7%B7%B1%B0%C7_%BE%F8%B4%D9.jpg?type=w2"
        alt="gonawoo"
      />
      <TextField id="standard-full-width" label="아이디" />
      <TextField id="standard-full-width" label="비밀번호" />
      <Button size="small" variant="contained" color="primary" onClick={abc}>
        로그인 하기
      </Button>
      <Button size="small" variant="contained" color="secondary">
        계정 새로 만들기
      </Button>
    </Grid>
  );
}

// etc
function abc() {
  console.log('abc');
}

export default LoginPage;
