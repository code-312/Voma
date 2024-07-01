import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import BoardContainer from '../components/AssignmentBoard/BoardContainer';
import ArchiveContainer from '../components/ArchivePage/ArchiveContainer';
import { ArchiveLink } from '../styles/pages/ProjectPage.style';
import { fetchArchivedProjects } from '../lib/Requests';

const ArchivedProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getArchived = async () => {
      const archivedProjects = await fetchArchivedProjects();
      setProjects(archivedProjects);
    };
    getArchived();
  }, []);

  const sidebarLink = (
    <ArchiveLink to="/projects">
      <ArrowLeft /> Back to Projects
    </ArchiveLink>
  );
  const mainContent = <ArchiveContainer projects={projects} />;
  return (
    <BoardContainer
      sideBarContent={sidebarLink}
      mainContainerContent={mainContent}
      archivePage
      projectPage
    />
  );
};

export default ArchivedProjects;
