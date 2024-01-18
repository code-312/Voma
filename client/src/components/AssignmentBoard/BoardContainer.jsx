import { StyledBoardContainer, BoardSidebar, BoardContent } from '../../styles/components/BoardContainer.style';

export default function BoardContainer({ sideBarContent, mainContainerContent, projectPage }) {
    return (<>
        <StyledBoardContainer>
            <BoardSidebar>
                { sideBarContent }
            </BoardSidebar>  
            <BoardContent projectPage={projectPage}>
                { mainContainerContent }
            </BoardContent>
        </StyledBoardContainer>
    </>)
}