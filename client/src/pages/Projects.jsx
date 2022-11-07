import React, { useEffect, useState, useCallback } from 'react';
import { fetchProjects, fetchSkills } from '../lib/Requests';
import BoardContainer from '../components/AssignmentBoard/BoardContainer';
import ProjectCard from '../components/AssignmentBoard/ProjectCard';
import ProjectInfo from '../components/ProjectPage/ProjectInfo';
import ProjectSidebar from '../components/ProjectPage/ProjectSidebar';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projectCards, setProjectCards] = useState([]);
  const [mainContent, setMainContent] = useState(<p>Select a project to see details</p>);
  const [selectedProject, setSelectedProject] = useState({});

  const getProjectDetails = useCallback(
    async (id) => {
      setSelectedProject(projects.find((project) => project.id === id) || {});
    },
    [projects],
  );

  const handleProjectQueryNum = async (arr) => {
    // GET QUERY FROM URL - CHECKS FOR NULL
    const query = window.location.search.slice(1).split('=');
    // NULL CHECK ISNAN CHECK
    if (query[query.length - 1] === null || Number.isNaN(query)) {
      setSelectedProject(arr[0]);
      return;
    }
    // CHECKS INDEX OF QUERY NUM TO ARR ID
    const idx = arr.findIndex((proj) => proj.id === +query[query.length - 1]);
    if (idx < 0) {
      setSelectedProject(arr[0]);
    } else {
      setSelectedProject(arr[idx]);
    }
  };

  useEffect(() => {
    const getProjects = async () => {
      const projs = await fetchProjects();
      setProjects(projs);
      // FIND QUERY IF THERE IS ONE
      handleProjectQueryNum(projs);
    };

    getProjects();
  }, []);

  useEffect(() => {
    const getSkills = async () => {
      const fetchedSkills = await fetchSkills();
      setSkills(fetchedSkills);
    };

    getSkills();
  }, []);

  useEffect(() => {
    // Not ideal, this runs every time a project is selected
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
      const sidebar = <ProjectSidebar>{cards}</ProjectSidebar>;
      setProjectCards(sidebar);
    }
  }, [projects, getProjectDetails, selectedProject]);

  useEffect(() => {
    if (selectedProject) {
      setMainContent(<ProjectInfo project={selectedProject} skills={skills} />);
    }
  }, [selectedProject, skills]);

  return <BoardContainer sideBarContent={projectCards} mainContainerContent={mainContent} />;
};

export default Projects;
