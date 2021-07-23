import { createGlobalStyle, css } from 'styled-components';

export const BaseCSSReset = css`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    font-weight: normal;
  }
  blockquote,
  dl,
  dd,
  figure,
  h1,
  h2,
  h3,
  h4,
  h5,
  hr,
  h6,
  p,
  input,
  pre {
    margin: 0;
  }
  ul {
    padding-left: 0;
    list-style: none;
  }
  ol,
  ul {
    margin: 0;
    padding: 0;
  }
  sup {
    top: 0;
  }
  img {
    max-width: 100%;
    border-style: none;
  }
  html {
    font-size: 1rem;
    line-height: 1.25;
  }
  body {
    min-height: 100vh;
    background-color: #fff;
    color: #000;
    font-family: 'IBM Plex Sans', sans-serif;
  }
  main {
    min-height: 75vh;
  }
  p {
    font-size: 1.125rem;
    line-height: 1.5;
    margin-bottom: 1.6875rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.25;
    margin-bottom: 0.35em;
  }
  fieldset {
    border: none;
    padding: 0;
  }
  a {
    text-decoration: none;
  }
  button {
    padding: 0;
    border-style: none;
    border-width: 0;
    background-color: transparent;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  select::-ms-expand {
    display: none;
  }
`;

const GlobalStyle = createGlobalStyle`
  ${BaseCSSReset};
  :root {
    --warning-color: #e20606;
    --blue: #414CB3;
  }

  input[type=text] {
    display: block;
  }

  button {
    color: var(--blue);
    border: 2px solid var(--blue);
    border-radius: 3px;
    font-size: 1.1rem;
    padding: 12px 14px;
    margin: 1rem 1rem 0 0;
    cursor: pointer;
    &:disabled {
      border-color: #9e9c9c;
      color: gray;
      cursor: not-allowed;
    }
  }

  .warning {
    color: var(--warning-color);
  }
`;

export default GlobalStyle;
