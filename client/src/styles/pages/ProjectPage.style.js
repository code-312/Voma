import styled from 'styled-components';

export const ProjectSidebarContainer = styled.div`
    padding: 8px;
    width: 100%;
    height: 100%;
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