import styled from 'styled-components';

const FieldsetStyles = styled.fieldset`
  width: 50vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  @media (max-width: 900px) {
    width: 80%;
  }

  legend {
    padding: 3rem 0 1rem 0;
    font-size: 3rem;
    font-weight: 700;
  }

  p {
    font-size: 1rem;
  }

  p.instructions {
    font-size: 1.6rem;
    font-weight: 700;
    margin-top: 2rem;
  }

  label {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .skillLabel {
    vertical-align: middle;
    font-size: 1.2rem;
    font-weight: 400;
    &:last-of-type {
      margin-bottom: 2rem;
    }
  }

  input[type='text'] {
    margin-top: 0.6rem;
    margin-bottom: 1rem;
    padding: 0.6rem;
    width: 15rem;
  }

  input[type='radio'] {
    vertical-align: middle;
    width: 1.2rem;
    height: 1.2rem;
    color: gray;
    border: 3px solid gray;
    margin-right: 1rem;
  }

  label:last-of-type {
    margin-bottom: 0;
  }

  nav {
    display: flex;
  }

  button {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  button[type='submit'] {
    margin-right: 4rem;
    margin-left: auto;
  }

  hr {
    height: 1px;
    background-color: #bababa;
    border: none;
  }

  ol {
    list-style-position: inside;
  }

  .registerh1,
  .registerh2 {
    font-weight: bold;
  }

  .registerp2 {
    margin-bottom: 2rem;
  }

  .registerb1 {
    position: relative;
    top: 2rem;
    margin: 10vh;
  }
`;

export default FieldsetStyles;
