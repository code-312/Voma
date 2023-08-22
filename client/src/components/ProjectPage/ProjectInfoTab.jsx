import React from 'react';
import ProjectInfoField from './ProjectInfoField';

const ProjectInfoTab = ({ project, isEditing, saveFn }) => (
    <>
        <ProjectInfoField
            label="Problem Statement"
            value={project.projectStatement}
            isEditing={isEditing}
        />
        <ProjectInfoField
            label="Deliverables"
            value={project.deliverables?.join(', ')}
            isEditing={isEditing}
        />
        <ProjectInfoField
            label="Additional Comment"
            value={project.comment}
            isEditing={isEditing}
        />
    </>
);

export default ProjectInfoTab;
