// .prettierrc.mjs (또는 .prettierrc.js)
/** @type {import("prettier").Config} */
const config = {
  tabWidth: 2, // 탭 너비
  singleQuote: true, // 작은 따옴표 사용
  semi: true, // 문장 끝에 세미콜론 사용
  arrowParens: 'always', // 화살표 함수 괄호 항상 사용
  trailingComma: 'all', // 객체, 배열 등 마지막 요소 뒤에 쉼표 항상 사용
  printWidth: 80, // 한 줄에 최대로 출력할 수 있는 문자 수
  endOfLine: 'lf', // 라인 엔딩 스타일 (Linux, macOS)
};

export default config;
