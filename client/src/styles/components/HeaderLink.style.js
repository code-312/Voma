import styled from 'styled-components';

export const HeaderLinkContainer = styled.div`
    ${({ active }) => active && 'border-bottom: solid 3px var(--uiBlue);'}
`;

export const HeaderLink = styled.button`
    border: none;
    font-size: ${({ variant }) => variant === 'large' ? '18' : '14'}px;
    color: var(--managementBlue);
    width: 100%;
    margin: 16px 8px;
`;
