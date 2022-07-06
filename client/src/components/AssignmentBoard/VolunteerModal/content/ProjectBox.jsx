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
    AssignToProjectContainer
} from '../../../../styles/components/VolunteerModal.style';
import { assignVolunteerToProject } from '../../../../lib/Requests';

const ProjectBox = ({ project, active, setSelectedProject, volunteerSkill, volunteerId }) => {
    const [buttonName, setButtonName] = useState("Assign");
    
    const changeSelection = () => {
        setSelectedProject(project.id);
    }
    const isMatch = project.currentNeeds.indexOf(volunteerSkill) !== -1;

    const assign = async () => {
        setButtonName('...');
        const result = await assignVolunteerToProject(volunteerId, project.id);
        setButtonName(result ? 'Success!' : 'Error :(');
        if (result) {
            // TODO: More elegant way to update board than forcing reload
            window.location.reload();
        }
    }

    // TODO: get rid of extra border on projects adjacent to selected. 
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
            {/* <ProjectBoxName $selected={active}>{project.name}</ProjectBoxName>
            <ProjectBoxMatchIndicator $selected={active}>
                { isMatch ? 
                    <Match />
                    :
                    <Mismatch />
                }
                <ProjectMatchIndicator $match={isMatch}>{ isMatch ? 'MATCH' : 'MISMATCH '}</ProjectMatchIndicator>
            </ProjectBoxMatchIndicator> */}
        </ProjectBoxContainer>
    )
};

export default ProjectBox;
