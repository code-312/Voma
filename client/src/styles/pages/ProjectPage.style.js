import styled from 'styled-components';

export const ProjectSidebarContainer = styled.div`
    background-color: #fff;
    padding: 8px;
    width: 100%;
    height: 100%;
`;

export const ProjectSidebarProject = styled.div`
    padding: 12px 16px;
    color: rgba(0, 0, 0, 0.6);   
    background-color: #fff;
    cursor: pointer;
    ${(props) => props.$selected &&
        `color: #6200EE;
        background-color: #F2E7FE;
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