import React from 'react';
import { Button } from '@mui/material';
import { ProjectInfoSection, ButtonContainer } from '../../styles/pages/ProjectPage.style';

const ProjectInfoSwitcher = ({ editing, toggleEdit }) => {
    if (editing) {
        console.log("editing!"); 
    } else {
        console.log("not editing!");
    }
    return (
        <ProjectInfoSection>
            <ButtonContainer>
                <Button 
                    variant="text" 
                    disabled={editing} 
                    type="button" 
                    onClick={toggleEdit}>
                        Edit
                </Button>
                <Button 
                    variant="text" 
                    disabled={!editing} 
                    type="button" 
                    onClick={toggleEdit}>
                        Save
                </Button>
            </ButtonContainer>
        </ProjectInfoSection>
    )
};

export default ProjectInfoSwitcher;
