import React from 'react';
import { ProjectSidebarContainer, ArchiveLink } from '../../styles/pages/ProjectPage.style';



const ProjectSidebar = ({ children }) => (

    <ProjectSidebarContainer>
        <div>
            <h3>Projects</h3>
            <ArchiveLink to='/archive'>View Archived Projects</ArchiveLink>
            { children }
        </div>
    </ProjectSidebarContainer>
);

export default ProjectSidebar;
