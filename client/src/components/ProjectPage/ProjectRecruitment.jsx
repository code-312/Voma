import React from 'react';
import ProjectInfoField from './ProjectInfoField';

const ProjectRecruitment = ({ 
    currentNeeds, 
    goodFitFor, 
    tech, 
    isEditing, 
    changeListener,
    currentNeedsListener,
    skills 
}) => (
    <>
        <ProjectInfoField
            label="Current Needs"
            valueText={currentNeeds?.join(', ')}
            value={currentNeeds}
            isEditing={isEditing}
            changeListener={currentNeedsListener}
            options={skills.map((skill) => ({ value: skill.name, text: skill.name }))}
            type="checkbox"
            name="currentNeeds"
        />
        <ProjectInfoField
            label="Good Fit For"
            name="goodFitFor"
            value={goodFitFor}
            isEditing={isEditing}
            changeListener={changeListener}
            type="textbox"
        />
        <ProjectInfoField
            label="Tech"
            value={tech}
            changeListener={changeListener}
            name="tech"
            type="textbox"
            isEditing={isEditing}
        />
    </>
);

export default ProjectRecruitment;
