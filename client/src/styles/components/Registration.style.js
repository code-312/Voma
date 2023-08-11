import styled from 'styled-components';

export const RegBody = styled.div`
    display: inline-block;
    padding: 32px;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
    width: 40%; // % of parent element
    border-radius: 6px;
    background: var(--primary-colors-light-peach, #F6EDE9);
`;

export const RegPage = styled.div`
    display: flex;
    margin: auto;
    padding: 24px 0px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 48px;
    background: var(--shades-peach-shade-i, #D6C7C0);
    height: 100vh; // % of parent ele, vh 100% current viewport
`

