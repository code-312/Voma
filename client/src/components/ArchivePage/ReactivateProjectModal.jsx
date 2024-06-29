import React from 'react';
import Modal from '../Modal';
import { reactivateProject } from '../../lib/Requests';
import { ButtonStyle } from '../../styles/components/Button.style';
import { Card } from '../../styles/components/Card.style';
import { Label3 } from '../../styles/components/Typography';
import { NewProjectModalFooter } from '../../styles/pages/ProjectPage.style';

const ReactivateProjectModal = ({ isOpen, closeFn, selectedProject }) => {
  const reactivateProjectReq = async () => {
    if (selectedProject) {
      const result = await reactivateProject(selectedProject);
      if (result) {
        window.location.href = `/projects?selected=${selectedProject}`;
      }
    }
  };

  return (
    <Modal isOpen={isOpen} closeFn={closeFn}>
      <Card small>
        <h2>Reactivate Project?</h2>
        <Label3>Are you sure you want to add this back to active projects?</Label3>
        <NewProjectModalFooter>
          <ButtonStyle variant="solid blue" onClick={reactivateProjectReq}>
            Reactivate
          </ButtonStyle>
          <ButtonStyle variant="solid white" onClick={closeFn}>
            Cancel
          </ButtonStyle>
        </NewProjectModalFooter>
      </Card>
    </Modal>
  );
};

export default ReactivateProjectModal;
