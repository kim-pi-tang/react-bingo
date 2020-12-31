# Mock `json-server` for dev
### 1. 필요 패키지 설치
~~~bash
yarn install
~~~
### 2. 서버 실행
~~~ bash
yarn start
~~~
### 3. 요청 보내기
`http://localhost:4000/{API에 맞게 작성}` 쪽으로 요청 보내면 JSON응답이 온다.
브라우저에 주소 입력해서도 확인 가능.
### 주의사항
테스트 하는 것은 좋으나 별도 상의없이 `data.json`을 바꾼 채로 커밋하는 일은 없도록 합시다. 만약 파일이 변경됐다면 커밋 하기전에 리셋 해주세요.
### Reference
- https://github.com/typicode/lowdb
- https://github.com/typicode/json-server
- https://poiemaweb.com/json-server
