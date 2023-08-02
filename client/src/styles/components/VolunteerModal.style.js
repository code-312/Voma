import styled from 'styled-components';
import { BodyText3 } from './Typography';

   
export const VolunteerModalFooter = styled.div`
    padding: 16px;
    display: flex;
    justify-content: flex-end;
    height: 68px;
    border-top: 1px solid rgba(0, 0, 0, 0.12);
`;

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