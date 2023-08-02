import React, { useEffect, useState } from 'react';
import Modal from '../../Modal';
import ContentBox from '../../ContentBox';
import Profile from './content/Profile';
import Tasks from './content/Tasks';
import Activity from './content/Activity';
import ProjectAssignment from './content/ProjectAssignment';
import VolunteerModalFooter from './VolunteerModalFooter';
import { VolunteerLabel } from '../../../styles/components/VolunteerCard.style';
import {
    VolunteerModalName,
    VolunteerModalProject
} from '../../../styles/components/VolunteerModal.style';
import { 
  assignVolunteerToProject, 
  sendWelcomeSlackMessage, 
  editVolunteer,
  updateActivity 
} from '../../../lib/Requests';

const VolunteerModal = ({ volunteer, modalOpen, closeModal, projects, skillDetails }) => {
  // used to display currently assigned project
  const [project, setProject] = useState(null);
  const [projectName, setProjectName] = useState('')
  const [isEditing, setIsEditing] = useState(false);
  const [volunteerCopy, setVolunteerCopy] = useState({});
  const [footerVisible, setFooterVisible] = useState(true);
  const [updatedActivity, setUpdatedActivity] = useState([]);

  useEffect(() => {
    if (volunteer) {
      setVolunteerCopy(volunteer);
      if (volunteer.project) {
        setProject(volunteer.project);
        setProjectName(volunteer.project.name);
      } else {
        setProjectName(volunteer.completedTasks.length === 3 ? 'Assign to Project' : 'Currently Onboarding');
      }
    }
  }, [volunteer]);


  const editInfo = () => setIsEditing(true);
  const saveInfo = async () => {
    const actCopy = [...volunteerCopy.Events];
    let activitySuccess = true;
    updatedActivity.forEach(async (event) => {
      const currSuccess = await updateActivity(event.id, event.name, volunteer.id, event.isNew);
      // eslint-disable-next-line eqeqeq
      const index = actCopy.findIndex((item) => item.id == event.id);

      if (!currSuccess) {
        activitySuccess = false;
      }

      if (index !== -1) {
        actCopy[index].name = event.name;
      } else {
        actCopy.push({ id: event.id, name: event.name, createdAt: new Date() });
      }
    });

    const result = await editVolunteer(volunteerCopy);
    
    
    if (activitySuccess) { // todo: there is a delay updateing volunteer copy, and the updated events don't show up
      let newVol = {...volunteerCopy};
      newVol.Events = actCopy;
      setVolunteerCopy(newVol);
    }
    if (result && activitySuccess) {
      setIsEditing(false);
      
    } // Todo: Add error handling
  };

  const headerLinkListener = (index) => {
    setFooterVisible(index === 0 || index === 3);
  }

  const updateVolunteerCopy = (e) => {
    const { name, value } = e.currentTarget;
    const copyCopy = {...volunteerCopy};
    copyCopy[name] = value;
    setVolunteerCopy(copyCopy);
  }

  const addNewActivity = () => {
    const copy = {...volunteerCopy};
    // generate temp random id to keep track of updates
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    copy.Events.push({ name: "", isNew: true, id: array[0], createdAt: new Date() });

    setVolunteerCopy(copy);
  }

  const trackActivityChange = (id, name, isNew = false) => {
    const copy = [...updatedActivity];
    const index = copy.findIndex((item) => item.id === id);
    if (index !== -1) {
      copy[index].name = name
    } else {
      copy.push({ id, name, isNew });
    }

    setUpdatedActivity(copy);
  }

  const assignVolunteer = async (volunteerId, selectedProject) => {
    const result = await assignVolunteerToProject(volunteerId, selectedProject);
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

  const headContent = (
    <>
        <VolunteerModalName>{volunteerCopy.name}</VolunteerModalName>
        <VolunteerModalProject>{projectName}</VolunteerModalProject>
        <VolunteerLabel bgColor={skillDetails.backgroundColor} color={skillDetails.color}>
            { skillDetails.name }
        </VolunteerLabel>
    </>
  );

  const links = ['Profile', 'Tasks', 'Assign to a Project', 'Activity'];
  const content = [
    <Profile 
        key={`${volunteer.id}-profile`}
        volunteer={volunteerCopy} 
        isEditing={isEditing}
        updateVolunteerCopy={updateVolunteerCopy}
    />, 
    <Tasks 
        key={`${volunteer.id}-tasks`}
        tasks={volunteerCopy.completedTasks} 
    />, 
    <ProjectAssignment 
        key={`${volunteer.id}-projectAssignment`}
        volunteer={volunteerCopy} 
        projects={projects} 
        assignedProject={project}
        assignVolunteer={assignVolunteer}
    />,
    <Activity
        key={`${volunteer.id}-activity`}
        events={volunteerCopy.Events}
        isEditing={isEditing}
        volunteerId={volunteerCopy.id}
        trackActivityChange={trackActivityChange}
        addNewActivity={addNewActivity}
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
            headerClickFn={headerLinkListener}
            links={links}
            bodyContent={content}
            footContent={
              <VolunteerModalFooter
                visible={footerVisible} 
                isEditing={isEditing} 
                editInfo={editInfo} 
                saveInfo={saveInfo}
              />
            }
        />
    </Modal>
  );
};

export default VolunteerModal;