import React from 'react';
import ProjectInfoField from './ProjectInfoField';
import ProjectDeliverables from './ProjectDeliverables';

const ProjectInfoTab = ({
  problemStatement,
  deliverables,
  comment,
  isEditing,
  changeListener,
  deliverablesChangeListener,
}) => (
  <>
    <ProjectInfoField
      label="Problem Statement"
      value={problemStatement}
      isEditing={isEditing}
      changeListener={changeListener}
      name="problemStatement"
      type="textbox"
    />
    <ProjectDeliverables
      deliverables={deliverables}
      isEditing={isEditing}
      onChange={deliverablesChangeListener}
    />
    <ProjectInfoField
      label="Additional Comment"
      name="comment"
      type="textbox"
      changeListener={changeListener}
      value={comment}
      isEditing={isEditing}
    />
  </>
);

export default ProjectInfoTab;
