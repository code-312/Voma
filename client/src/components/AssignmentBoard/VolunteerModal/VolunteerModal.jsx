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
  updateActivityBulk,
  deleteActivityBulk
} from '../../../lib/Requests';

const VolunteerModal = ({ volunteer, modalOpen, closeModal, projects, skillDetails }) => {
  // used to display currently assigned project
  const [project, setProject] = useState(null);
  const [projectName, setProjectName] = useState('')
  const [isEditing, setIsEditing] = useState(false);
  const [volunteerCopy, setVolunteerCopy] = useState({});
  const [footerVisible, setFooterVisible] = useState(true);
  const [updatedActivity, setUpdatedActivity] = useState([]);
  const [activityToDelete, setActivityToDelete] = useState([]);

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

    updatedActivity.forEach((event) => {
        // eslint-disable-next-line eqeqeq
        const index = actCopy.findIndex((item) => item.id == event.id);

        if (index !== -1) {
          actCopy[index].name = event.name;
        } else {
          actCopy.push({ id: event.id, name: event.name, createdAt: new Date() });
        }
    });

    activityToDelete.forEach((id) => {
      // eslint-disable-next-line eqeqeq
      const index = actCopy.findIndex((item) => item.id == id);

      if (index !== -1) {
        actCopy.splice(index, 1);
      } 
    });

     const activityResult = updatedActivity.length > 0 ? await updateActivityBulk(updatedActivity) : true;
     const deleteResult = activityToDelete.length > 0 ? await deleteActivityBulk(activityToDelete) : true;
    

    const result = await editVolunteer(volunteerCopy);


    
    if (activityResult && deleteResult) { // todo: there is a delay updateing volunteer copy, and the updated events don't show up
      let newVol = {...volunteerCopy};
      newVol.Events = actCopy;
      setVolunteerCopy(newVol);
    }
    if (result && activityResult && deleteResult) {
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
    copy.Events.push({ name: "", id: array[0], createdAt: new Date(), volunteerId: volunteer.id, isNew: true });

    setVolunteerCopy(copy);
  }

  const trackActivityChange = (id, name, isNew) => {
    const copy = [...updatedActivity];
    const index = copy.findIndex((item) => item.id === id);
    if (index !== -1) {
      copy[index].name = name
    } else {
      copy.push({ id, name, volunteerId: volunteer.id, isNew });
    }

    setUpdatedActivity(copy);
  }

  const trackActivityToDelete = (id) => {
    setActivityToDelete([...activityToDelete, id]);
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
        trackActivityToDelete={trackActivityToDelete}
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