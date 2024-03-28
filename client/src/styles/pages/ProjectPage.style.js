import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ProjectSidebarContainer = styled.div`
    padding: 8px;
    width: 100%;
    height: calc(100vh - 175px);
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
`;

export const ProjectSidebarProject = styled.div`
    padding: 12px 8px;
    background-color: var(--lightPeach);
    cursor: pointer;
    ${(props) => props.$selected &&
        `color: var(--white);
        background-color: var(--uiBlue);
        `
    }
    &:first-of-type {
        margin-top: 16px;
    }
`;

export const ProjectLinkContainer = styled.div`
    display: flex;
    gap: 12px;
    svg {
        stroke:  var(--volunteerGreen);
    }
`;

export const ProjectTimeslotRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    label {
        display: block;
    }
`;

export const ProjectTimeslotContainer = styled.div`

`;

export const ProjectDeliverableContainer = styled.div`
    display: flex;
    margin-bottom: 8px;
`;

export const ProjectLinkEditContainer = styled.div`
    margin-bottom: 8px;
    input { 
        display: block;
    }
`;

export const ProjectSidebarButtonContainer = styled.div`
    position: absolute;
    padding: 16px;
    bottom: 55px;
    left: 0;
    width: 315px;


    button {
        svg {
            margin-right: 8px;
        }
    }
`;

export const NewProjectModalFooter = styled.div`
    display: flex;
    margin-top: 24px;
    button {
        margin-right: 24px;
    }
`;

export const ArchiveLink = styled(Link)`
    color: var(--managementBlue);
    margin-bottom: 8px;
`