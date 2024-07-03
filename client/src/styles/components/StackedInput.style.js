import styled from 'styled-components';

export const StackedInputContainer = styled.div`
  padding: 16px 12px;
  border-radius: 3px;
  border: 0.5px solid var(--blueShade2);
  background: var(--white);
  margin: 2px 0;
  
  &:hover:not(:checked) {
    background: rgba(117, 123, 142, 0.2);
    cursor: pointer;

    & label {
      cursor: pointer;
    }
  }
  
  ${({ checked }) =>
    checked &&
    `
    background-color: var(--uiBlue);
    color: var(--white);
  `}
  
  input {
    margin-right: 8px;
  }
  
  label {
    display: block;
    width: 100%;
  }
`;
