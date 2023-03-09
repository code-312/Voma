import React, { useState, useEffect } from 'react';
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

const ProjectAssignment = ({ volunteer, projects, selectedProject, setSelectedProject }) => {
    const [sortedProjects, setSortedProjects] = useState([]);
    const skillName = volunteer && volunteer.skills && volunteer.skills[0] && volunteer.skills[0].name;
    useEffect(() => {
        const sorted = [...projects].sort((a, b) => {
            const skillMatchA = a.currentNeeds.indexOf(skillName) !== -1;
            const skillMatchB = b.currentNeeds.indexOf(skillName) !== -1;
            if (!skillMatchA && skillMatchB) {
                return 1;
            } if (skillMatchA && !skillMatchB) {
                return -1;
            } 
            
            return 0;
        })
        
        setSortedProjects(sorted);
        if (sorted[0].currentNeeds.includes(skillName)) {
            setSelectedProject(sorted[0].id)
        }
    }, [projects, skillName])
    
    
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
                    {sortedProjects.map((project) => (
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
        </>
    );
}

export default ProjectAssignment;
