import styled from 'styled-components';

export const HeaderLinksWrapper = styled.div`
  display: flex;
`;

export const HeaderLinkContainer = styled.div`
  ${({ active }) => active && 'border-bottom: solid 3px var(--uiBlue);'}
  display: flex;
`;

export const HeaderLink = styled.button`
  border: none;
  font-size: ${({ variant }) => (variant === 'large' ? '18' : '14')}px;
  color: var(--managementBlue);
  width: 100%;
  margin: 16px 8px;
  padding: 16px 12px;
  ${({ forHeader }) =>
    forHeader &&
    `
        height: 56px;
        margin: 0;
    `}
`;
