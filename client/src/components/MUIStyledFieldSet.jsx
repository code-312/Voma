import styled from 'styled-components';

const MUIFieldsetStyles = styled.fieldset`
  width: 50vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  .MuiTextField-root {
    color: red;
  }
  .MuiButton-root {
    margin-top: 0.6rem;
    margin-bottom: 1rem;
    margin: 10px;
    padding: 1rem;
    width: 5rem;
    color: white;
    top: 1rem;
  }
  .MuiTypography-textPrimary {
    background-color: #6200ee;
    margin-left: 20px;
    color: white;
    width: 120px;
    margin: auto;
  }

  .MuiFormControl-root {
    margin-top: 0.6rem;
    margin-bottom: 1rem;
    padding: 0.6rem;
    width: 15rem;
  }

  .MuiTypography-h1 {
    color: #23036a;
    font-size: 2.5rem;
    font-weight: 500;
    padding: 0.6rem;
  }

  .MuiTypography-h2 {
    color: #23036a;
    font-size: 1.9rem;
    font-weight: 400;
    padding: 0.6rem;
  }

  .MuiTypography-paragraph {
    color: #23036a;
    font-size: 1.0rem;
  }
`;

export default MUIFieldsetStyles;
