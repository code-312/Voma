import React, { useState, useEffect, useCallback } from 'react';
import Typography from '@mui/material/Typography';
import ProjectBox from './ProjectBox';
import {
    ProjectAssignmentContainer, 
    ProjectAssignmentSkill,
    ProjectAssignmentSkillContainer,
    ProjectAssignmentProjectContainer, 
} from '../../../../styles/components/VolunteerModal.style';

const ProjectAssignment = ({ volunteer, projects }) => {
    const [selectedProject, setSelectedProject] = useState(null);

    const skillName = volunteer && volunteer.skills && volunteer.skills[0] && volunteer.skills[0].name;
    
    return (    
        <>
            <Typography variant="h6" component="h2" gutterBottom>
                Project Assignment
            </Typography>
            <ProjectAssignmentContainer>
                <ProjectAssignmentSkillContainer>
                    <ProjectAssignmentSkill>{skillName || '--'}</ProjectAssignmentSkill>
                </ProjectAssignmentSkillContainer>
                <ProjectAssignmentProjectContainer>
                
                    {projects.map((project) => (
                        <ProjectBox 
                            key={project.id} 
                            project={project} 
                            active={selectedProject === project.id}
                            setSelectedProject={setSelectedProject}
                            volunteerSkill={skillName} 
                        />
                        ))
                    }
                    
                </ProjectAssignmentProjectContainer>
            </ProjectAssignmentContainer>
        </>
    );
}

export default ProjectAssignment;
