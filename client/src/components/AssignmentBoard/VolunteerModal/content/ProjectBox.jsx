import React from 'react';
import { ReactComponent as Match } from '../../../../assets/Match.svg';
import { ReactComponent as Mismatch } from '../../../../assets/Mismatch.svg';
import { 
    ProjectBoxContainer, 
    ProjectBoxName, 
    ProjectMatchIndicator,
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
            { isMatch ? 
                <Match />
                :
                <Mismatch />
            }
            <ProjectMatchIndicator $match={isMatch}>{ isMatch ? 'MATCH' : 'MISMATCH '}</ProjectMatchIndicator>
        </ProjectBoxContainer>
    )
};

export default ProjectBox;
