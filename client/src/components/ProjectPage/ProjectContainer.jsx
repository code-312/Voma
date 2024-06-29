import React, { useState, useEffect } from 'react';
import ContentBox from '../ContentBox';
import ProjectOverview from './ProjectOverview';
import ProjectRecruitment from './ProjectRecruitment';
import ProjectLinks from './ProjectLinks';
import ProjectInfoTab from './ProjectInfoTab';
import ProjectSettings from './ProjectSettings';
import VolunteerModalFooter from '../AssignmentBoard/VolunteerModal/VolunteerModalFooter';
import { editProject } from '../../lib/Requests';

const NewProjectContainer = ({ project, skills }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectRecruitStatus, setNewProjectRecruitStatus] = useState('false');
  const [newProjectMeetingCadence, setNewProjectMeetingCadence] = useState('Mondays at 6pm');
  const [newProjectSummary, setNewProjectSummary] = useState('');
  const [newProjectCurrentNeeds, setNewProjectCurrentNeeds] = useState([]);
  const [newProjectFit, setNewProjectFit] = useState('');
  const [newProjectTech, setNewProjectTech] = useState('');
  const [newProjectStatement, setNewProjectStatement] = useState('');
  const [newProjectDeliverables, setNewProjectDeliverables] = useState([]);
  const [newProjectComment, setNewProjectComment] = useState('');
  const [newProjectLinks, setNewProjectLinks] = useState([]);
  const [newProjectTimeslots, setNewProjectTimeslots] = useState([]);

  useEffect(() => {
    if (project) {
      setNewProjectName(project.name);
      setNewProjectRecruitStatus(`${project.activelyRecruiting}`);
      setNewProjectSummary(project.description);
      setNewProjectCurrentNeeds(project.currentNeeds);
      setNewProjectFit(project.goodFitFor);
      setNewProjectTech(project.tech);
      setNewProjectComment(project.comment);
      setNewProjectLinks(project.Links);
      setNewProjectMeetingCadence(project.meetingCadence);
      setNewProjectStatement(project.projectStatement);
      setNewProjectDeliverables(project.deliverables);
      setNewProjectTimeslots(project.Timeslots);
    }
  }, [project]);

  const showEditForm = () => {
    setIsEditing(true);
  };

  const fieldToStateMapper = {
    projectName: setNewProjectName,
    activelyRecruiting: setNewProjectRecruitStatus,
    meetingCadence: setNewProjectMeetingCadence,
    summary: setNewProjectSummary,
    goodFitFor: setNewProjectFit,
    tech: setNewProjectTech,
    problemStatement: setNewProjectStatement,
    comment: setNewProjectComment,
  };

  const deleteItem = (id, array) => {
    const copy = [...array];
    const index = copy.findIndex((slot) => slot.id === id);
    copy.splice(index, 1);
    return copy;
  };

  const addNewItem = (array, defaultValues) => {
    const copy = [...array];
    // generate temp random id to keep track of updates
    const valueArray = new Uint32Array(1);
    window.crypto.getRandomValues(valueArray);
    copy.push({ id: valueArray[0], ...defaultValues });

    return copy;
  };

  const changeListener = (e) => {
    const stateSetter = fieldToStateMapper[e.currentTarget.name];
    stateSetter(e.currentTarget.value);
  };

  const deliverablesChangeListener = (newDeliverables) => {
    setNewProjectDeliverables(newDeliverables);
  };

  const linkListener = (newLink) => {
    const index = newProjectLinks.findIndex((link) => link.id === newLink.id);
    if (index !== -1) {
      const linksCopy = [...newProjectLinks];
      linksCopy[index] = newLink;
      setNewProjectLinks(linksCopy);
    }
  };

  const timeslotListener = (newSlot) => {
    const index = newProjectTimeslots.findIndex((slot) => slot.id === newSlot.id);
    if (index !== -1) {
      const timeslotsCopy = [...newProjectTimeslots];
      timeslotsCopy[index] = newSlot;
      setNewProjectTimeslots(timeslotsCopy);
    }
  };

  const addNewTimeslot = () => {
    const copy = addNewItem(newProjectTimeslots, {
      day: 'Monday',
      startHour: 0,
      startMinute: 0,
      endHour: 0,
      endMinute: 0,
    });
    setNewProjectTimeslots(copy);
  };

  const deleteTimeslot = async (id) => {
    const timeslotCopy = deleteItem(id, newProjectTimeslots);
    setNewProjectTimeslots(timeslotCopy);
  };

  const deleteLink = async (id) => {
    const linksCopy = deleteItem(id, newProjectLinks);
    setNewProjectLinks(linksCopy);
  };

  const currentNeedsListener = (e) => {
    if (e.currentTarget.checked) {
      setNewProjectCurrentNeeds([...newProjectCurrentNeeds, e.currentTarget.value]);
    } else {
      let currentNeedsCopy = [...newProjectCurrentNeeds];
      currentNeedsCopy.splice(newProjectCurrentNeeds.indexOf(e.currentTarget.value), 1);
      setNewProjectCurrentNeeds(currentNeedsCopy);
    }
  };

  const createLink = () => {
    const linksCopy = addNewItem(newProjectLinks, { title: '', url: '' });
    setNewProjectLinks(linksCopy);
  };

  const saveProject = async () => {
    const newDeliverables =
      typeof newProjectDeliverables === 'string'
        ? newProjectDeliverables.split(',')
        : newProjectDeliverables;

    const newProject = {
      name: newProjectName,
      description: newProjectSummary,
      currentNeeds: newProjectCurrentNeeds,
      activelyRecruiting: newProjectRecruitStatus === 'true',
      tech: newProjectTech,
      goodFitFor: newProjectFit,
      comment: newProjectComment,
      meetingCadence: newProjectMeetingCadence,
      projectStatement: newProjectStatement,
      deliverables: newDeliverables,
      Timeslots: newProjectTimeslots,
      Links: newProjectLinks,
    };

    const result = await editProject(newProject, project.id);
    if (result === true) {
      window.location = `/projects?selected=${project.id}`;
    } else {
      // TODO: Error handling
      console.log(result);
    }
  };

  if (!project) {
    return null;
  }

  const bodyContent = [
    <ProjectOverview
      key={`${project.id}-overview`}
      activelyRecruiting={newProjectRecruitStatus}
      cadence={newProjectMeetingCadence}
      summary={newProjectSummary}
      timeslots={newProjectTimeslots}
      timeslotListener={timeslotListener}
      addNewTimeslot={addNewTimeslot}
      deleteTimeslot={deleteTimeslot}
      projectName={newProjectName}
      isEditing={isEditing}
      saveFn={null}
      changeListener={changeListener}
    />,
    <ProjectRecruitment
      key={`${project.id}-recruitment`}
      currentNeeds={newProjectCurrentNeeds}
      tech={newProjectTech}
      goodFitFor={newProjectFit}
      isEditing={isEditing}
      saveFn={null}
      changeListener={changeListener}
      currentNeedsListener={currentNeedsListener}
      skills={skills}
    />,
    <ProjectInfoTab
      key={`${project.id}-projectInfo`}
      problemStatement={newProjectStatement}
      deliverables={newProjectDeliverables}
      comment={newProjectComment}
      deliverablesChangeListener={deliverablesChangeListener}
      isEditing={isEditing}
      saveFn={null}
      changeListener={changeListener}
    />,
    <ProjectLinks
      key={`${project.id}-projectLinks`}
      links={newProjectLinks}
      isEditing={isEditing}
      linkListener={linkListener}
      deleteLink={deleteLink}
      createLink={createLink}
      projectId={project.id}
    />,
    <ProjectSettings key="settings" id={project.id} />,
  ];

  return (
    <ContentBox
      headContent={<h1>{project.name}</h1>}
      links={['Overview', 'Recruitment', 'Project Info', 'Links', 'Settings']}
      variant="large"
      bodyContent={bodyContent}
      footContent={
        <VolunteerModalFooter
          visible
          isEditing={isEditing}
          editInfo={showEditForm}
          saveInfo={saveProject}
        />
      }
      marginTop
      hideScroll
    />
  );
};

export default NewProjectContainer;
