import styled from 'styled-components';

export const HeaderLinksWrapper = styled.div`
  display: flex;
`;

export const HeaderLinkContainer = styled.div`
  ${({ active }) => active && 'border-bottom: solid 3px var(--uiBlue);'}
  display: flex;
  &:hover {
    background-color: var(--uiBlue);
    color: var(--white);

    & button {
      color: var(--white);
    }
  }
`;

export const HeaderLink = styled.button`
  border: none;
  font-size: ${({ variant }) => (variant === 'large' ? '18' : '14')}px;
  color: var(--managementBlue);
  width: 100%;
  padding: 28px 20px;

  ${({ forHeader }) =>
    forHeader &&
    `
        height: 56px;
        margin: 0;
    `}
`;
