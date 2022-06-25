import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ReactComponent as VolunteerIcon } from '../../../assets/volunteer-icon.svg';
import VolunteerModalTabs from './VolunteerModalTabs';
import ModalContent from './ModalContent';
import {
    VolunteerModalContainer, 
    VolunteerModalSidebar, 
    VolunteerSidebarTabContainer,
    VolunteerSidebarHeader,
    VolunteerModalContent, 
} from '../../../styles/components/VolunteerModal.style';

const VolunteerModal = ({ volunteer, modalOpen, closeModal }) => {
  const [project, setProject] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  console.log(volunteer);
  useEffect(() => {
    if (volunteer.project) {
      setProject(volunteer.project.name);
    } else {
      setProject(volunteer.completedTasks.length === 3 ? 'Assign to Project' : 'Currently Onboarding');
    }
  }, [volunteer]);

  return (
    <Modal
        open={modalOpen}
        onClose={closeModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
    >
      <VolunteerModalContainer>
        <VolunteerModalSidebar>
          <VolunteerSidebarTabContainer $noHover>
            <VolunteerIcon />
            <VolunteerSidebarHeader>
              <Typography id="modal-title" variant="h6" component="h2">
                  {volunteer.name}
              </Typography>
              <Typography paragraph>
                  {project}
              </Typography>
            </VolunteerSidebarHeader>
          </VolunteerSidebarTabContainer>
          <VolunteerModalTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </VolunteerModalSidebar>
        <VolunteerModalContent>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          <ModalContent volunteer={volunteer} activeTab={activeTab} />
        </Typography>
        </VolunteerModalContent>
      </VolunteerModalContainer>
    </Modal>
  );
};

export default VolunteerModal;