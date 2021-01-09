import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// css
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(5),
      width: '50ch',
    },
  },
}));

// component
function LoginPage() {
  const classes = useStyles();

  return (
    <div style={{ textAlign: 'center' }}>
      <form className={classes.root} noValidate autoComplete="off">
        <img
          src="https://mblogthumb-phinf.pstatic.net/20110323_149/yean5rang_1300858060958TRSBY_JPEG/%B1%D7%B7%B1%B0%C7_%BE%F8%B4%D9.jpg?type=w2"
          alt="gonawoo"
        />
        <br />
        <TextField id="standard-full-width" label="아이디" fullWidth />
        <br />
        <TextField id="standard-full-width" label="비밀번호" fullWidth />
        <br />
        <Button size="small" variant="contained" color="primary" fullWidth onClick={abc}>
          로그인 하기
        </Button>
        <br />
        <Button size="small" variant="contained" color="secondary" fullWidth>
          계정 새로 만들기
        </Button>
      </form>
    </div>
  );
}

// etc
function abc() {
  console.log('abc');
}

export default LoginPage;
