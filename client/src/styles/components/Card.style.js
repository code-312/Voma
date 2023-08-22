import styled from 'styled-components';

export const Card = styled.div`
    background-color: var(--lightPeach);
    padding: 32px;
    width: 606px;
    border-radius: 6px;
    margin-left: auto;
    margin-right: auto;
    ${({ marginTop }) => 'margin-top: 24px;'}
    overflow-y: scroll;
    
    h1 {
        white-space: break-spaces;
    }
`;