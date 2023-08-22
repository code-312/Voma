import React from 'react';
import ProjectInfoField from './ProjectInfoField';

const ProjectRecruitment = ({ project, isEditing, saveFn }) => (
    <>
        <ProjectInfoField
            label="Current Needs"
            value={project.currentNeeds?.join(', ')}
            isEditing={isEditing}
        />
        <ProjectInfoField
            label="Good Fit For"
            value={project.goodFitFor}
            isEditing={isEditing}
        />
        <ProjectInfoField
            label="Tech"
            value={project.tech}
            isEditing={isEditing}
        />
    </>
);

export default ProjectRecruitment;
