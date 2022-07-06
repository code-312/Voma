import React, { useState } from 'react';
import { ReactComponent as Match } from '../../../../assets/Match.svg';
import { ReactComponent as Mismatch } from '../../../../assets/Mismatch.svg';
import { 
    ProjectBoxContainer, 
    ProjectBoxName, 
    ProjectMatchIndicator,
    ProjectBoxMatchIndicator,
    ProjectAssignmentRow,
    ProjectAssignmentCell,
} from '../../../../styles/components/VolunteerModal.style';

const ProjectBox = ({ project, active, setSelectedProject, volunteerSkill }) => {
    
    const changeSelection = () => {
        setSelectedProject(project.id);
    }
    const isMatch = project.currentNeeds.indexOf(volunteerSkill) !== -1;

    return (
        <ProjectBoxContainer $selected={active} onClick={changeSelection} tabIndex={0}>
            <ProjectAssignmentRow>
                <ProjectAssignmentCell>
                    <ProjectBoxName $selected={active}>{project.name}</ProjectBoxName>
                </ProjectAssignmentCell>
            </ProjectAssignmentRow>
            <ProjectAssignmentRow>
                <ProjectAssignmentCell>
                    <ProjectBoxMatchIndicator $selected={active}>
                        { isMatch ? 
                            <Match />
                            :
                            <Mismatch />
                        }
                        <ProjectMatchIndicator $match={isMatch}>{ isMatch ? 'MATCH' : 'MISMATCH '}</ProjectMatchIndicator>
                    </ProjectBoxMatchIndicator>
                </ProjectAssignmentCell>
            </ProjectAssignmentRow>
        </ProjectBoxContainer>
    )
};

export default ProjectBox;
