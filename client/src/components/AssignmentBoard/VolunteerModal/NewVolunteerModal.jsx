import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Modal from '../../Modal';
import ContentBox from '../../ContentBox';
import { ReactComponent as VolunteerIcon } from '../../../assets/volunteer-icon.svg';
import VolunteerModalTabs from './VolunteerModalTabs';
import ModalContent from './ModalContent';
import ModalFooterButtons from './ModalFooterButtons';
import useEscapeListener from '../../../hooks/useEscapeListener';
import Profile from './content/Profile';
import Tasks from './content/Tasks';
import Activity from './content/Activity';
import ProjectAssignment from './content/ProjectAssignment';
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
  const [project, setProject] = useState(null);
  const [projectName, setProjectName] = useState('')
  // used to assign to project
  const [selectedProject, setSelectedProject] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (volunteer.project) {
      setProject(volunteer.project);
      setProjectName(volunteer.project.name);
    } else {
      setProjectName(volunteer.completedTasks.length === 3 ? 'Assign to Project' : 'Currently Onboarding');
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
        <VolunteerModalProject>{projectName}</VolunteerModalProject>
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
  const content = [
    <Profile 
        key="profile" 
        volunteer={volunteer} 
    />, 
    <Tasks 
        key="tasks"
        tasks={volunteer.completedTasks} 
    />, 
    <ProjectAssignment 
        key="projectAssignment"
        volunteer={volunteer} 
        projects={projects} 
        assignedProject={project}
    />,
    <Activity
        key="activity"
        events={volunteer.Events}
    />];

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