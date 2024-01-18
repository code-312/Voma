import styled from 'styled-components';

export const StyledBoardContainer = styled.div`
    margin-top: 64px;
    display: inline-block;
    overflow-x: none;
    width: 100vw;
    max-width: 100vw;
`;

export const BoardSidebar = styled.div`
    background-color: var(--lightPeach);
    border: solid 1px var(--peachShade1);
    padding: 24px;
    width: 315px;
    position: fixed;
    height: 100vh;
    overflow: auto;
`;

export const BoardContent = styled.div`
    display: flex;
    width: ${({ projectPage }) => projectPage ? 'calc(100vw - 315px)' : '100%'};
    margin-left: 315px;
    overflow: auto;
`;
