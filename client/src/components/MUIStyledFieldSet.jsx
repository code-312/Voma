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
    padding: 0.6rem;
    width: 5rem;
    background-color: #6200ee;
    color: white;

    margin-top: 0;
    margin-bottom: 1rem;
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
    ${'' /* color: 'pink'; */}
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
    font-size: 1.2rem;
  }

  .MuiRadio-root #oreo {
    color: red;
    size: 44px;
    font-size: 1.2rem;
  }
`;

export default MUIFieldsetStyles;
