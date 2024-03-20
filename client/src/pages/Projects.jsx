/* eslint-disable */
import React, { useEffect, useState, useCallback } from 'react';
import { fetchProjects, fetchSkills } from '../lib/Requests';
import ProjectContainer from '../components/ProjectPage/ProjectContainer';
import BoardContainer from '../components/AssignmentBoard/BoardContainer';
import ProjectCard from '../components/AssignmentBoard/ProjectCard';
import ProjectSidebar from '../components/ProjectPage/ProjectSidebar';
import CreateProjectModal from '../components/ProjectPage/CreateProjectModal';
import useTitle from '../hooks/useTitle';
import Button from '../components/Button';
import { PlusCircleIcon } from 'lucide-react';
import { ProjectSidebarButtonContainer } from '../styles/pages/ProjectPage.style';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [projectCards, setProjectCards] = useState([]);
    const [mainContent, setMainContent] = useState(<p>Select a project to see details</p>);
    const [selectedProject, setSelectedProject] = useState({});
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    useTitle('Voma | Projects');

    const getProjectDetails = useCallback(async (selectedId) => {
        setSelectedProject(projects.find((project) => project.id === selectedId) || {});
    }, [projects]);

    useEffect(() => {
        const getProjects = async () => {
            const projs = await fetchProjects();
            setProjects(projs);
            let defaultSelected;
            const params = new URLSearchParams(window.location.search);
            const selected = params.get("selected");
            
            if (selected) {
                defaultSelected = projs.find(project => project.id == selected);
            }
            const displayedProject = defaultSelected || projs[0];

            setSelectedProject(displayedProject);
        }

        getProjects();
    }, []);

    useEffect(() => {
        const getSkills = async () => {
            const fetchedSkills = await fetchSkills();
            setSkills(fetchedSkills);
        }

        getSkills();
    }, [])

    useEffect(() => { // Not ideal, this runs every time a project is selected
        if (projects.length > 0) {
            const cards = projects.map((project) => (    
                    <ProjectCard 
                        key={`project-${project.id}`}
                        projectName={project.name}
                        projectId={project.id} 
                        onClick={getProjectDetails}
                        selected={selectedProject.id === project.id}
                    />
            ));
            const sidebar = (
                <ProjectSidebar>
                    {cards}
                    <ProjectSidebarButtonContainer>
                        <Button 
                            variant="fw outline blue"
                            onClick={openModal}>
                                <PlusCircleIcon /> Create a Project
                        </Button>
                    </ProjectSidebarButtonContainer>
                </ProjectSidebar>
            )
            setProjectCards(sidebar);
        }
    }, [projects, getProjectDetails, selectedProject]);

    useEffect(() => {
        if (selectedProject) {
            setMainContent(
                <ProjectContainer project={selectedProject} skills={skills} />
            );
        }
    }, [selectedProject, skills])

    return (
        <>
            <CreateProjectModal isOpen={isOpen} closeFn={closeModal} />
            <BoardContainer
                sideBarContent={projectCards}
                mainContainerContent={mainContent}
                projectPage={true}
            />
        </>
    );
}

export default Projects;
