import { StyledBoardContainer, BoardSidebar, BoardContent } from '../../styles/components/BoardContainer.style';

export default function BoardContainer({ sideBarContent, mainContainerContent, projectPage, archivePage }) {
    return (<>
        <StyledBoardContainer>
            <BoardSidebar archivePage={archivePage}>
                { sideBarContent }
            </BoardSidebar>  
            <BoardContent projectPage={projectPage}>
                { mainContainerContent }
            </BoardContent>
        </StyledBoardContainer>
    </>)
}