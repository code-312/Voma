import React, { useState, useEffect, useCallback } from 'react';
import Typography from '@mui/material/Typography';
import ProjectBox from './ProjectBox';
import {
    ProjectAssignmentContainer, 
    ProjectBoxName,
    ProjectAssignmentSkillContainer,
    ProjectAssignmentProjectContainer, 
    ProjectAssignmentRow,
    ProjectAssignmentCell,
} from '../../../../styles/components/VolunteerModal.style';

const ProjectAssignment = ({ volunteer, projects }) => {
    const [selectedProject, setSelectedProject] = useState(null);

    const skillName = volunteer && volunteer.skills && volunteer.skills[0] && volunteer.skills[0].name;
    
    return (    
        <>
            <Typography variant="h6" component="h2" gutterBottom>
                Project Match
            </Typography>
            <ProjectAssignmentContainer>
                <ProjectAssignmentSkillContainer>

                <ProjectAssignmentRow>
                    <ProjectAssignmentCell $label>
                        <ProjectBoxName>
                            Skill
                        </ProjectBoxName>
                    </ProjectAssignmentCell>
                </ProjectAssignmentRow>
                <ProjectAssignmentRow>
                    <ProjectAssignmentCell $label>
                        <ProjectBoxName>
                            {skillName || '--'}
                        </ProjectBoxName>
                    </ProjectAssignmentCell>
                </ProjectAssignmentRow>
                </ProjectAssignmentSkillContainer>
                    <ProjectAssignmentProjectContainer>
                    {projects.map((project) => (
                        <ProjectBox 
                        key={project.id} 
                        project={project} 
                        active={selectedProject === project.id}
                        setSelectedProject={setSelectedProject}
                        volunteerSkill={skillName} 
                        volunteerId={volunteer.id}
                        />
                        ))
                    }
                    </ProjectAssignmentProjectContainer>
            </ProjectAssignmentContainer>
            <br />
            <br />
            <br />
            {/* <ProjectAssignmentContainer>
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
                            volunteerId={volunteer.id}
                        />
                        ))
                    }
                    
                </ProjectAssignmentProjectContainer>
            </ProjectAssignmentContainer> */}
        </>
    );
}

export default ProjectAssignment;
