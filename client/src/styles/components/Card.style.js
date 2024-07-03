import styled from 'styled-components';

export const Card = styled.div`
  background-color: var(--lightPeach);
  padding: 32px;
  width: 606px;
  border-radius: 6px;
  margin-left: auto;
  margin-right: auto;
  ${({ marginTop }) => 'margin-top: 24px;'}
  ${({ small }) =>
    small &&
    `
        height: auto;
        margin: auto;
    `}
    overflow-y: ${({ hideScroll }) => (hideScroll ? 'hidden' : 'scroll')};
  overflow-x: hidden;
  h1 {
    white-space: break-spaces;
  }
`;
