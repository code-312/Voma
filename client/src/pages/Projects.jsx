import React, { useEffect, useState, useCallback } from 'react';
import { Typography } from '@mui/material';
import { fetchProjects } from '../lib/Requests';
import BoardContainer from '../components/AssignmentBoard/BoardContainer';
import VolunteerBox from '../components/AssignmentBoard/VolunteerBox';
import ProjectInfo from '../components/AssignmentBoard/ProjectInfo';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [projectCards, setProjectCards] = useState([]);
    const [mainContent, setMainContent] = useState(<p>Select a project to see details</p>);
    const [selectedProject, setSelectedProject] = useState(null);

    const getProjectDetails = useCallback(async (id) => {
        await fetch(`/api/project/${id}`)
        .then((res) => {
            if (res.ok) {
                return res.json()
                .then((project) => {
                    setSelectedProject(project);
                })
            }
            throw new Error('Something went wrong');
        })
        .catch((err) => console.log(`Error! ${err}`));

        
    }, []);

    useEffect(() => {
        const getProjects = async () => {
            const projs = await fetchProjects();
            setProjects(projs);
        }

        getProjects();
    }, []);

    useEffect(() => { 
        if (projects.length > 0) {
            const cards = (
                <>
                <Typography variant="h6" mt="24px" mb="16px">Projects</Typography>
                { projects.map((project) => <VolunteerBox 
                    key={`project-${project.id}`} 
                    volunteer={project}
                    onClick={() => getProjectDetails(project.id)}
                    />)
                }
                </>
            )
            setProjectCards(cards);
        }
    }, [projects, getProjectDetails]);

    useEffect(() => {
        if (selectedProject) {
            setMainContent(
                <ProjectInfo project={selectedProject} />
            );
        }
    }, [selectedProject])

    return <BoardContainer
                sideBarContent={projectCards}
                mainContainerContent={mainContent}
            />;
}

export default Projects;
