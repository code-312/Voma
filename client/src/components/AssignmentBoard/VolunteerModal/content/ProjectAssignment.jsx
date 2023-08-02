import React, { useState, useEffect, useCallback } from 'react';
import ProjectBox from './ProjectBox';
import AssignConfirm from './AssignConfirm';
import { BodySubText } from '../../../../styles/components/Typography';

const ProjectAssignment = ({ volunteer, projects, assignedProject, assignVolunteer }) => {
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

    }, [projects, skillName, assignedProject]);

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
            setBodyContent(
                <AssignConfirm
                    toggleAssign={toggleAssigning}
                    volunteer={volunteer}
                    project={selectedProject}
                    assignToProject={assignVolunteer}
                />
            );
        }
    }, [
        isAssigning, 
        sortedProjects, 
        assignedProject, 
        skillName, 
        volunteer, 
        toggleAssigning, 
        selectedProject, 
        toggleAndSetProject, 
        assignVolunteer
    ]);
    
    
    return (    
        <>
            <h3>Assign to a Project</h3>
            <BodySubText>Select a project to assign to a volunteer.</BodySubText>
            {bodyContent}
        </>
    );
}

export default ProjectAssignment;
