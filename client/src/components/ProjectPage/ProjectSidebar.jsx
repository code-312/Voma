import React from 'react';
import { PlusCircle } from 'lucide-react';
import { ProjectSidebarContainer } from '../../styles/pages/ProjectPage.style';
import Button from "../Button";


const ProjectSidebar = ({ children }) => (
        <ProjectSidebarContainer>
            <div>
                <h3>Projects</h3>
                { children }
            </div>
            <div>
                <Button variant="fw outline blue"><PlusCircle /> Create a Project</Button>
            </div>
        </ProjectSidebarContainer>
    );

export default ProjectSidebar;
