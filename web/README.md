# Bingo Front-End

### 필요 패키지 설치

```bash
yarn install
```

### Dev 서버 실행

```bash
yarn start
```

이후 `localhost:3000`에서 접속 가능

### VSCode ESLint & Prettier 세팅

1. VSCode에서 Extension 설치하기
   - ESLint
   - Prettier
2. 파일에 warning이나 룰에 맞지 않는 것들이 에디터에서 보이게 된다

\*\* 관련 설정 파일들

- `.eslintrc.json`
  `eslint` 관련 설정 파일, 설정된 룰에 맞게 warning 표시해줌
- `.prettierrc.json`
  `prettier` 관련 설정 파일, 포매팅 해줌
- `.vscode/settings.json`
  `prettier` 설정에 맞게 파일 저장할 때 자동 포매팅 해줌

### 참고자료

- https://velog.io/@velopert/eslint-and-prettier-in-react#eslint-%EA%B2%80%EC%82%AC-%EB%AC%B4%EC%8B%9C%ED%95%98%EA%B8%B0
- https://react.vlpt.us/basic/27-useful-tools.html
