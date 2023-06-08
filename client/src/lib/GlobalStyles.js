import { createGlobalStyle, css } from 'styled-components';

export const BaseCSSReset = css`
  * {
    box-sizing: border-box;
  }
  html {
    font-size: 16px;
    line-height: 1.25;
  }
  body {
    min-height: 100vh;
    background-color: #F2E7FF;
    color: #23036A;
    margin: 0;
    padding: 0;
    font-size: 1.25rem;
    font-family: 'Outfit', 'Sans serif';
  }

  h1, h2, h3, h4 {
    font-weight: bold;
  }

  h1 {
    font-size: 42px; 
  }

  h2 {
    font-size: 32px;
  }

  h3 {
    font-size: 24px;
  }

  h4 {
    font-size: 18px;
  }
 
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

  main {
    min-height: 75vh;
  }
  p {
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
    color: blue;
    text-decoration: underline;
  }
  button {
    padding: 0;
    border-style: none;
    border-width: 0;
    background-color: transparent;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  label {
    font-weight: 500;
  }
  select::-ms-expand {
    display: none;
  }
`;

const GlobalStyle = createGlobalStyle`
  ${BaseCSSReset};
  :root {
    --managementBlue: #1E1E64;
    --managementBlue2: #6C75A3;
    --managementBlue3: #B2B8D1;
    --volunteerGreen: #33A34D;
    --lightPeach: #F6EDE9;
    --uiBlue: #1579C1;
    --uiError: #A31963;
    --blueShadeIII: #08082D;
    --blueShadeSemiTransparent: rgba(8, 8, 45, 0.9);;
    --white: #FFFFFF;
    --peachShade1: #D6C7C0;
    --peachShade2: #B79E92;
    --blueShade1: #CDD1DD;
    --blueShade2: #757B8E;
    --lightBlueGrey: #F5F6F8;
    --warning-color: #e20606;
    --blue: #414CB3;
  }

  ::-webkit-scrollbar {
    background: rgba(98, 0, 238, 0.08) !important;
    width: 14px;
    height: 14px;
  }

  ::-webkit-scrollbar-thumb {
    background: #bb86fc !important;
    border: 3px solid transparent !important;
    background-clip: content-box !important;
    border-radius: 20px;
  }

  input[type=text] {
    display: block;
  }

  button, .button {
    border-radius: 4px;
    padding: 12px 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 45px;
    font-family: 'Outfit', 'Sans serif';
    font-weight: 500;
    font-size: 16px;
    cursor: pointer;
    &:disabled {
      border-color: #9e9c9c;
      color: gray;
      cursor: not-allowed;
    }
  }

  button[type=submit] {
    &:enabled {
    background-color: var(--blue);
    color: white;
    }
  }

  .warning {
    color: var(--warning-color);
    font-size: 1.25rem;
  }
`;

export default GlobalStyle;
