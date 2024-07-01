/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Label3, Label4, BodyText2 } from '../../styles/components/Typography';
import { StyledInput } from '../../styles/components/Input.style';
import { ProfileInfoContainer } from '../../styles/components/VolunteerModal.style';
import { ProjectDeliverableContainer } from '../../styles/pages/ProjectPage.style';
import Button from '../Button';

const ProjectDeliverables = ({ onChange, isEditing, deliverables }) => {
  const [hasError, setHasError] = useState(false);

  const updateDeliverable = (e, index) => {
    setHasError(false);
    const { value } = e.currentTarget;
    const newDeliverables = [...deliverables];
    newDeliverables[index] = value;
    onChange(newDeliverables);
  };

  const deleteDeliverable = (index) => {
    const newDeliverables = [...deliverables];
    newDeliverables.splice(index, 1);
    onChange(newDeliverables);
  };

  const addNewDeliverable = () => {
    const newDeliverables = [...deliverables, ''];
    onChange(newDeliverables);
  };

  if (isEditing) {
    return (
      <ProfileInfoContainer>
        <Label3>Deliverables</Label3>
        {hasError && <Label4>That deliverable already exists for this project</Label4>}
        {deliverables.map((del, index) => (
          <ProjectDeliverableContainer key={`deliverable-${index}`}>
            <StyledInput value={del} onChange={(e) => updateDeliverable(e, index)} />
            <Button onClick={() => deleteDeliverable(index)} variant="text-only red">
              Delete
            </Button>
          </ProjectDeliverableContainer>
        ))}
        <Button variant="fw outline blue" icon={PlusCircle} onClick={addNewDeliverable}>
          Add Deliverable
        </Button>
      </ProfileInfoContainer>
    );
  }

  return (
    <div>
      <ProfileInfoContainer>
        <Label3>Deliverables</Label3>
        <BodyText2>{deliverables?.length > 0 ? deliverables.join(', ') : '--'}</BodyText2>
      </ProfileInfoContainer>
    </div>
  );
};

export default ProjectDeliverables;
