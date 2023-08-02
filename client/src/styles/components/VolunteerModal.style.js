import styled from 'styled-components';
import { BodyText2, BodyText3 } from './Typography';

export const VolunteerModalContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 75%;
    background-color: #fff;
    border: 2px solid #000;
    box-shadow: 2px 2px 3px #666;
`;

export const VolunteerModalBody = styled.div`
    display: flex;
`;

export const VolunteerModalSidebar = styled.div`
    border-right: solid 1px #938F9B;
    flex: 1;
`;

export const VolunteerSidebarTabContainer = styled.div`
    display: flex;
    padding: 16px;
    ${(props) => !props.$noHover && `cursor: pointer;`}
    ${(props) => props.$noHover && `border-bottom: 1px solid rgba(0, 0, 0, 0.12);`}
    
    h2 {
        color: black;
    }

    path {
        fill: #666;
    }

    .MuiTypography-subtitle-2 {
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        letter-spacing: 0.1px;
        color: #666666;
        padding-left: 32px;
    }
    ${(props) => props.$active && `
        background-color: rgba(98, 0, 238, 0.08);
        .MuiTypography-subtitle-2 {
            color: #6200EE;
        }
        path {
            fill: #6200EE;
        }
    `}
`

export const VolunteerModalFooter = styled.div`
    padding: 16px;
    display: flex;
    justify-content: flex-end;
    height: 68px;
    border-top: 1px solid rgba(0, 0, 0, 0.12);
`;

export const VolunteerSidebarHeader = styled.div`
    padding-left: 32px;
    .MuiTypography-paragraph {
        font-weight: 500;
        font-size: 13px;
        line-height: 16px;
        color: #666666;
    }
`;

// export const VolunteerTabLabel = styled.

export const VolunteerModalContent = styled.div`
    padding: 16px;
    flex: 2;
    overflow: hidden;
    .MuiTypography-body1 {
        margin-top: 0;
    }
    .MuiTypography-overline {
        color: #666;
    }
    .MuiTypography-subtitle-1 {
        color: rgba(0, 0, 0, 0.87);
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: 0.15px;
        margin-bottom: 8px;
        margin-top: -8px;
    }
    h2 {
        color: black;
    }
`;

export const VolunteerTabTable = styled.table`
    padding: 8px;
    border-collapse: collapse;
    width: 100%;
    thead tr, tbody tr {
        border-bottom: solid 1px #938F9B;
    }

    td, th {
        padding: 16px;
        border-bottom: solid 1px #938F9B;
        font-size: 14px;
        line-height: 17px;
        color: #3A3535;
        font-family: 'Inter', sans-serif;
    }

    th {
        text-align: left;
        font-weight: 700;
    }
`;

export const ProjectAssignmentContainer = styled.div`
    display: flex;
    align-items: center;
    height: 144px;
`;

export const ProjectAssignmentSkillContainer = styled.div`
   
`;

export const ProjectAssignmentProjectContainer = styled.div`
    flex: 2;
    display: flex;
    align-items: center;
    overflow-x: scroll;
    overflow-y: hidden;
    margin-bottom: -10px;
    &::-webkit-scrollbar {
        height: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
    background: #fff;
    }
`;

export const ProjectAssignmentRow = styled.div`
    height: 72px;
    &:first-of-type {
        border-top: 1px solid rgba(0, 0, 0, 0.12);
    }
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
`;

export const ProjectAssignmentCell = styled.div`
    padding: 16px;
    width: ${(props) => props.$label ? '160px' : '100%'};
`;

export const ProjectAssignmentSkill = styled.h3`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 24px;
    color: #212121;
`;

export const ProjectBoxContainer = styled.div`
    ${(props) => props.$selected &&
        `background: rgba(98, 0, 238, 0.08);        
        border: 1px solid #6200EE;
        border-radius: 10px;
        `
    }
`;

export const ProjectBoxName = styled.h4`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 13px;
    line-height: 21px;
    color: ${(props) => props.$selected ? '#019592' : 'rgba(0, 0, 0, 0.6)'};
    width: 160px;
    // height: 205px;
    flex: 1;
    text-align: left;
    justify-self: flex-start;
`;

export const ProjectBoxContent = styled.div`
    border-right: solid 1px #5100FF;
`;

export const ProjectBoxMatchIndicator = styled.div`
    flex: 1;
    align-self: center;
    justify-content: flex-start;
    display: flex;
    align-items: center;
    flex-direction: row;
    svg {
        margin: 4px;
        path {
            fill: ${(props) => props.$match ? '#019592' : 'rgba(0, 0, 0, 0.6)'};
        }
    }
    h5 {
        color: ${(props) => props.$match ? '#019592' : 'rgba(0, 0, 0, 0.6)'};
        margin-bottom: 0;
    }
`;

export const ProjectMatchIndicator = styled.h5`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 15px;
    color: ${(props) => props.$match ? '#198D16' : 'rgba(0, 0, 0, 0.6)'};
`;

export const AssignToProjectContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    button {
        border: none;
        font-family: 'Roboto';
        font-weight: 500;
        width: 116px;
        height: 26px;
        margin: 0;
        background-color: #5100FF;
        color: #fff;
        text-transform: uppercase;
        border-radius: 25px;
        font-size: 14px;
        padding: 0;
    }
`;

export const BellIconStyle = styled.span`
    color: green;
    margin-left: -4px;
    margin-right: 4px;
`
// New Volunteer Modal
export const VolunteerModalName = styled.h2`
    margin-bottom: 0;
`;

export const VolunteerModalProject = styled(BodyText3)`
    margin-bottom: 8px;
`;

// Profile section
export const ProfileInfoContainer = styled.div`
    margin: 24px 0;
`;

// Completed Tasks
export const IncompleteTaskIcon = styled.div`
    height: 24px;
    width: 24px;
    border-radius: 100%;
    background-color: var(--blueShade1);
    border-color: var(--managementBlue);
`;

export const TaskContainer = styled.div`
    margin: 16px 0;
    display: flex;
    align-items: center;
    gap: 8px;
`;

// Assign to Project
export const AssignAccordionHeader = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ProjectSkillContainer = styled.div`
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
`;

export const ProjectAssignButtonContainer = styled.div`
    margin: 0 -24px;
    padding: 16px 24px;
    border-top: solid 1px var(--peachShade1);
`;

export const PseudoLinkContainer = styled.div`
    margin: 24px 0;
    display: flex;
`;

export const ConfirmContainer = styled.div`

`;

export const ConfirmButtonContainer = styled.div`
    display: flex;
    gap: 8px;
`;