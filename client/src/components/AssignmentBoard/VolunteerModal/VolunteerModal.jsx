import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ReactComponent as VolunteerIcon } from '../../../assets/volunteer-icon.svg';
import VolunteerModalTabs from './VolunteerModalTabs';
import ModalContent from './ModalContent';
import ModalFooterButtons from './ModalFooterButtons';
import {
    VolunteerModalContainer, 
    VolunteerModalBody,
    VolunteerModalSidebar, 
    VolunteerSidebarTabContainer,
    VolunteerSidebarHeader,
    VolunteerModalContent, 
} from '../../../styles/components/VolunteerModal.style';
import { assignVolunteerToProject, sendWelcomeSlackMessage } from '../../../lib/Requests';

const VolunteerModal = ({ volunteer, modalOpen, closeModal, projects }) => {
  // used to display currently assigned project
  const [project, setProject] = useState('');
  // used to assign to project
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (volunteer.project) {
      setProject(volunteer.project.name);
    } else {
      setProject(volunteer.completedTasks.length === 3 ? 'Assign to Project' : 'Currently Onboarding');
    }
  }, [volunteer]);

  const assignVolunteer = async () => {
    if (volunteer.id && selectedProject) {

      const result = await assignVolunteerToProject(volunteer.id, selectedProject);
      if (result) {
        const projectDetails = projects.find((detail) => detail.id === selectedProject);
        if (projectDetails) {
          const slackResult = await sendWelcomeSlackMessage(volunteer.slackUserId, projectDetails);
          if (slackResult) {
            console.log("Success!");
            window.location.reload();
          } else {
            console.log("oh no");
            window.location.reload();
          }
        }
        // TODO: More elegant way to update board than forcing reload
      }
    }
  }

  return (
    <Modal
        open={modalOpen}
        onClose={closeModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
    >
      <VolunteerModalContainer>
        <VolunteerModalBody>
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
            <ModalContent 
              volunteer={volunteer} 
              activeTab={activeTab} 
              projects={projects} 
              selectedProject={selectedProject}
              setSelectedProject={setSelectedProject}
            />
          </VolunteerModalContent>
        </VolunteerModalBody>
        <ModalFooterButtons 
          standard={activeTab !== 4} 
          closeModal={closeModal} 
          assignVolunteerToProject={assignVolunteer} 
          selectedProject={selectedProject}
        />
      </VolunteerModalContainer>
    </Modal>
  );
};

export default VolunteerModal;