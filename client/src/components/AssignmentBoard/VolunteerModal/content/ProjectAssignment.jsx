import React, { useState, useEffect, useCallback } from 'react';
import Typography from '@mui/material/Typography';
import ProjectBox from './ProjectBox';
import AssignConfirm from './AssignConfirm';
import {
    ProjectAssignmentContainer, 
    ProjectBoxName,
    ProjectAssignmentSkillContainer,
    ProjectAssignmentProjectContainer, 
    ProjectAssignmentRow,
    ProjectAssignmentCell,
} from '../../../../styles/components/VolunteerModal.style';
import { BodySubText, Label3 } from '../../../../styles/components/Typography';

const ProjectAssignment = ({ volunteer, projects, assignedProject, isEditing }) => {
    const [sortedProjects, setSortedProjects] = useState([]);
    const [bodyContent, setBodyContent] = useState(null);
    const [isAssigning, setIsAssigning] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const toggleAssigning = useCallback(() => {
        setIsAssigning(!isAssigning);
    }, [setIsAssigning, isAssigning]);

    const toggleAndSetProject = useCallback((project) => {
        setSelectedProject(project);
        toggleAssigning();
    }, [setSelectedProject, toggleAssigning]);

    const skillName = volunteer && volunteer.skills && volunteer.skills[0] && volunteer.skills[0].name;
    
    useEffect(() => {
        let filteredProjects = [...projects];
        if (assignedProject) {
            filteredProjects.splice(filteredProjects.findIndex(p => p.id === assignedProject.id), 1)
        }
        let sorted = filteredProjects.sort((a, b) => {
            const skillMatchA = a.currentNeeds.indexOf(skillName) !== -1;
            const skillMatchB = b.currentNeeds.indexOf(skillName) !== -1;
            if (!skillMatchA && skillMatchB) {
                return 1;
            } if (skillMatchA && !skillMatchB) {
                return -1;
            } 
            
            return 0;
        });
        if (assignedProject) {
            sorted = [assignedProject, ...sorted];
        }
        setSortedProjects(sorted);
        // if (sorted[0].currentNeeds.includes(skillName)) {
        //     setSelectedProject(sorted[0].id)
        // }
    }, [projects, skillName]);

    useEffect(() => {
        if (!isAssigning && sortedProjects.length > 0) {
            setBodyContent(sortedProjects.map((project) => (
                <ProjectBox 
                    key={project.id} 
                    project={project} 
                    volunteerSkill={skillName} 
                    volunteerId={volunteer.id}
                    assigned={project.id === assignedProject?.id}
                    toggleAssign={toggleAndSetProject}
                />
                ))
            );
        } else {
            setBodyContent(<AssignConfirm
                                toggleAssign={toggleAssigning}
                                volunteer={volunteer}
                                project={selectedProject}
                           />);
        }
    }, [isAssigning, sortedProjects, assignedProject, skillName, volunteer, toggleAssigning, selectedProject, toggleAndSetProject]);
    
    
    return (    
        <>
            <h3>Assign to a Project</h3>
            <BodySubText>Select a project to assign to a volunteer.</BodySubText>
            {bodyContent}
        </>
        // <>
        //     <Typography variant="h6" component="h2" gutterBottom>
        //         Project Match
        //     </Typography>
        //     <ProjectAssignmentContainer>
        //         <ProjectAssignmentSkillContainer>

        //         <ProjectAssignmentRow>
        //             <ProjectAssignmentCell $label>
        //                 <ProjectBoxName>
        //                     Skill
        //                 </ProjectBoxName>
        //             </ProjectAssignmentCell>
        //         </ProjectAssignmentRow>
        //         <ProjectAssignmentRow>
        //             <ProjectAssignmentCell $label>
        //                 <ProjectBoxName>
        //                     {skillName || '--'}
        //                 </ProjectBoxName>
        //             </ProjectAssignmentCell>
        //         </ProjectAssignmentRow>
        //         </ProjectAssignmentSkillContainer>
        //             <ProjectAssignmentProjectContainer>
        //             {sortedProjects.map((project) => (
        //                 <ProjectBox 
        //                     key={project.id} 
        //                     project={project} 
        //                     active={selectedProject === project.id}
        //                     setSelectedProject={setSelectedProject}
        //                     volunteerSkill={skillName} 
        //                     volunteerId={volunteer.id}
        //                 />
        //                 ))
        //             }
        //             </ProjectAssignmentProjectContainer>
        //     </ProjectAssignmentContainer>
        // </>
    );
}

export default ProjectAssignment;
