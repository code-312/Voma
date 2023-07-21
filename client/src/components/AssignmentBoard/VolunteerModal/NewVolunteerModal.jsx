import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Modal from '../../Modal';
import ContentBox from '../../ContentBox';
import { ReactComponent as VolunteerIcon } from '../../../assets/volunteer-icon.svg';
import VolunteerModalTabs from './VolunteerModalTabs';
import ModalContent from './ModalContent';
import ModalFooterButtons from './ModalFooterButtons';
import useEscapeListener from '../../../hooks/useEscapeListener';
import { BodyText3 } from '../../../styles/components/Typography';
import { VolunteerLabel } from '../../../styles/components/VolunteerCard.style';
import {
    VolunteerModalContainer, 
    VolunteerModalBody,
    VolunteerModalSidebar, 
    VolunteerSidebarTabContainer,
    VolunteerSidebarHeader,
    VolunteerModalContent, 
    VolunteerModalName,
    VolunteerModalProject
} from '../../../styles/components/VolunteerModal.style';
import { ButtonStyle } from '../../../styles/components/Button.style';
import { assignVolunteerToProject, sendWelcomeSlackMessage } from '../../../lib/Requests';

const NewVolunteerModal = ({ volunteer, modalOpen, closeModal, projects, skillDetails }) => {
  // used to display currently assigned project
  const [project, setProject] = useState('');
  // used to assign to project
  const [selectedProject, setSelectedProject] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (volunteer.project) {
      setProject(volunteer.project.name);
    } else {
      setProject(volunteer.completedTasks.length === 3 ? 'Assign to Project' : 'Currently Onboarding');
    }
  }, [volunteer]);

  const editInfo = () => setIsEditing(true);
  const saveInfo = () => setIsEditing(false);

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
  const headContent = (
    <>
        <VolunteerModalName>{volunteer.name}</VolunteerModalName>
        <VolunteerModalProject>{project}</VolunteerModalProject>
        <VolunteerLabel bgColor={skillDetails.backgroundColor} color={skillDetails.color}>
            { skillDetails.name }
        </VolunteerLabel>
    </>
  );

  const footContent = (
    <>
        <ButtonStyle variant={!isEditing ? "solid blue" : "solid white"} disabled={isEditing} onClick={editInfo}>Edit</ButtonStyle>
        <ButtonStyle variant={isEditing ? "solid blue" : "solid white"} disabled={!isEditing} onClick={saveInfo}>Save</ButtonStyle>
    </>
  );

  const links = ['Profile', 'Tasks', 'Assign to a Project', 'Activity'];
  const content = [<h3 key="profile">profile page</h3>, <h3 key="tasks">tasks page</h3>, <h3 key="assign">assign page</h3>, <h3 key="activity">activity page</h3>];

  return (
    <Modal
        isOpen={modalOpen}
        closeFn={closeModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
    >
        <ContentBox
            headContent={headContent}
            links={links}
            bodyContent={content}
            footContent={footContent}
        />
      {/* <VolunteerModalContainer>
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
      </VolunteerModalContainer> */}
    </Modal>
  );
};

export default NewVolunteerModal;