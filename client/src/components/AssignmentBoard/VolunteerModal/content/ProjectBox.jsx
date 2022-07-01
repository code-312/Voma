import React from 'react';
import { ReactComponent as Match } from '../../../../assets/Match.svg';
import { ReactComponent as Mismatch } from '../../../../assets/Mismatch.svg';
import { 
    ProjectBoxContainer, 
    ProjectBoxName, 
    ProjectMatchIndicator,
    ProjectBoxMatchIndicator,
    AssignToProjectContainer
} from '../../../../styles/components/VolunteerModal.style';

const ProjectBox = ({ project, active, setSelectedProject, volunteerSkill }) => {
    const changeSelection = () => {
        setSelectedProject(project.id);
    }
    const isMatch = project.currentNeeds.indexOf(volunteerSkill) !== -1;

    // TODO: get rid of extra border on projects adjacent to selected. 
    return (
        <ProjectBoxContainer $selected={active} onClick={changeSelection} tabIndex={0}>
            <ProjectBoxName>{project.name}</ProjectBoxName>
            <ProjectBoxMatchIndicator>
                { isMatch ? 
                    <Match />
                    :
                    <Mismatch />
                }
                <ProjectMatchIndicator $match={isMatch}>{ isMatch ? 'MATCH' : 'MISMATCH '}</ProjectMatchIndicator>
            </ProjectBoxMatchIndicator>
            <AssignToProjectContainer>
                { active && <button type="button">Click me</button>}
            </AssignToProjectContainer>
        </ProjectBoxContainer>
    )
};

export default ProjectBox;
