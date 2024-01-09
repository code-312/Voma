import React from 'react';
import { ProjectSidebarContainer } from '../../styles/pages/ProjectPage.style';


const ProjectSidebar = ({ children }) => (
        <ProjectSidebarContainer>
           <h3>Projects</h3>
            { children }
        </ProjectSidebarContainer>
    );

export default ProjectSidebar;
