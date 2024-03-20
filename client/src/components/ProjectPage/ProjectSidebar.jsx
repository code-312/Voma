import React from 'react';
import { ProjectSidebarContainer } from '../../styles/pages/ProjectPage.style';


const ProjectSidebar = ({ children }) => (

    <ProjectSidebarContainer>
        <div>
            <h3>Projects</h3>
            { children }
        </div>
    </ProjectSidebarContainer>
);

export default ProjectSidebar;
