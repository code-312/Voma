import React from 'react';
import { Link } from 'react-router-dom';
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

    const changeSelectionKeyPress = (e) => {
        const { key } = e;
        if (key === 'Enter') {
            setSelectedProject(project.id);
        }
    }

    const isMatch = project.currentNeeds.indexOf(volunteerSkill) !== -1;

    return (
        <ProjectBoxContainer $selected={active} onClick={changeSelection} tabIndex={0} onKeyDown={changeSelectionKeyPress}>
            <ProjectAssignmentRow>
                <ProjectAssignmentCell>
                    <Link to={`/projects?selected=${project.id}`} style={{ textDecoration: 'none' }}>
                        <ProjectBoxName $selected={active}>{project.name}</ProjectBoxName>
                    </Link>
                </ProjectAssignmentCell>
            </ProjectAssignmentRow>
            <ProjectAssignmentRow>
                <ProjectAssignmentCell>
                    <ProjectBoxMatchIndicator $selected={active} $match={isMatch}>
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
