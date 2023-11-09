import React, { useState, useEffect, useContext } from 'react';
import ProjectInfoSwitcher from './ProjectInfoSwitcher';
import ProjectInfoBox from './ProjectInfoBox';
import ProjectinfoEditableBox from './ProjectInfoEditableBox';
import { ProjectInfoContainer } from '../../styles/pages/ProjectPage.style';
import ContentBox from '../ContentBox';
import ProjectOverview from './ProjectOverview';
import ProjectRecruitment from './ProjectRecruitment';
import ProjectLinks from './ProjectLinks';
import ProjectInfoTab from './ProjectInfoTab';
import VolunteerModalFooter from '../AssignmentBoard/VolunteerModal/VolunteerModalFooter';
import { editProject, removeLink, addLink, editLink } from '../../lib/Requests';
import { AuthContext } from '../../lib/AuthProvider';


const NewProjectContainer = ({ project, skills }) => {
    const UserAuth = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [newProjectName, setNewProjectName] = useState("");
    const [newProjectRecruitStatus, setNewProjectRecruitStatus] = useState("false");
    const [newProjectMeetingCadence, setNewProjectMeetingCadence] = useState("Mondays at 6pm");
    const [newProjectSummary, setNewProjectSummary] = useState("");
    const [newProjectCurrentNeeds, setNewProjectCurrentNeeds] = useState([])
    const [newProjectFit, setNewProjectFit] = useState("");
    const [newProjectTech, setNewProjectTech] = useState("");
    const [newProjectStatement, setNewProjectStatement] = useState("");
    const [newProjectDeliverables, setNewProjectDeliverables] = useState([])
    const [newProjectComment, setNewProjectComment] = useState("");
    const [newProjectLinks, setNewProjectLinks] = useState([]);
    const [newProjectTimeslots, setNewProjectTimeslots] = useState([]);
    const [timeslotsToDelete, setTimeslotsToDelete] = useState([]);


    useEffect(() => {
        if (project) {
            console.log(project);
            setNewProjectName(project.name);
            setNewProjectRecruitStatus(`${project.activelyRecruiting}`);
            setNewProjectSummary(project.description);
            setNewProjectCurrentNeeds(project.currentNeeds);
            setNewProjectFit(project.goodFitFor);
            setNewProjectTech(project.tech);
            setNewProjectComment(project.comment);
            setNewProjectLinks(project.Links)
            setNewProjectMeetingCadence(project.meetingCadence);
            setNewProjectStatement(project.projectStatement);
            setNewProjectDeliverables(project.deliverables);
            setNewProjectTimeslots(project.Timeslots);
         }
    }, [project]);

    const showEditForm = () => {
        setIsEditing(true);
    }

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

    const changeListener = (e) => {
        const stateSetter = fieldToStateMapper[e.currentTarget.name];
        stateSetter(e.currentTarget.value);
    }

    const deliverablesChangeListener = (newDeliverables) => {
        setNewProjectDeliverables(newDeliverables);
    }

    const linkListener = (newLink) => {
        const index = newProjectLinks.findIndex((link) => link.id === newLink.id);
        if (index !== -1) {
            const linksCopy = [...newProjectLinks];
            linksCopy[index] = newLink;
            setNewProjectLinks(linksCopy);
        } 
    }

    const timeslotListener = (newSlot) => {
        const index = newProjectTimeslots.findIndex(slot => slot.id === newSlot.id);
        if (index !== -1) {
            const timeslotsCopy = [...newProjectTimeslots];
            timeslotsCopy[index] = newSlot;
            setNewProjectTimeslots(timeslotsCopy);
        }
    }

    const addNewTimeslot = () => {
        const copy = [...newProjectTimeslots];
        // generate temp random id to keep track of updates
        const array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        copy.push({id: array[0], day: "Monday", startHour: 0, startMinute: 0, endHour: 0, endMinute: 0 });
    
        setNewProjectTimeslots(copy);
      }

    const currentNeedsListener = (e) => {
        if (e.currentTarget.checked) {
            setNewProjectCurrentNeeds([...newProjectCurrentNeeds, e.currentTarget.value]);
        } else {
            let currentNeedsCopy = [...newProjectCurrentNeeds];
            currentNeedsCopy.splice(newProjectCurrentNeeds.indexOf(e.currentTarget.value), 1);
            setNewProjectCurrentNeeds(currentNeedsCopy);
        }
    }

    const deleteLink = async (id) => {
        if (project.Links && project.Links.some((link) => link.id === id)) {
            const result = await removeLink(id);
            if (result.error) {
                console.log(`Errror! ${result.error}`);
            };
        }
        const linksCopy = [...newProjectLinks];
        const index = linksCopy.findIndex((link) => link.id === id);
        linksCopy.splice(index, 1);
        setNewProjectLinks(linksCopy);
    }

    const createLink = () => {
        const linksCopy = [...newProjectLinks];
        const tempId = Math.floor(Math.random() * 9999) + 1000;
        linksCopy.push({ title: "", text: "", required: false, id: tempId });
        setNewProjectLinks(linksCopy);
    }

    const addLinkToProject = async (link) => {
        const result = await addLink(link);
        if (result.error) {
            console.log(`Error! ${result.error}`);
        }
    };

    const editExistingLink = async (link) => {
        const result = await editLink(link);
        if (result.error) {
            console.log(`Error! ${result.error}`);
        }
    }

    const processLinks = async (links) => {
        links.forEach((link) => {
            const newLink = {
                id: link.id,
                url: link.url,
                title: link.title, 
                required: link.required,
                projectId: project.id
            };
            // If link is already associated with project, potentially send edit request
            const exisitngLink = project.Links ? 
                project.Links.find((exLink) => exLink.id === link.id) 
                : 
                null;
            if (exisitngLink) {
                if (exisitngLink.title !== link.title || 
                    exisitngLink.url !== link.url ||
                    exisitngLink.required !== link.required) {
                        editExistingLink(newLink);
                    }
            } else {
                addLinkToProject(newLink);
            }
        });
        window.location.reload();
    }

    const tagTimeslotToDelete = (id) => {
        setTimeslotsToDelete([...timeslotsToDelete, id]);
    }

    const saveProject = async () => {
        const newDeliverables = typeof newProjectDeliverables === "string" ? 
        newProjectDeliverables.split(',') : 
        newProjectDeliverables;

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
            Timeslots: newProjectTimeslots // Todo: save timeslots
        };

        const result = await editProject(newProject, project.id);
        if (result === true) {
            if (newProjectLinks.length > 0) {
                processLinks(newProjectLinks);
            } else {
                window.location = `/projects?selected=${project.id}`;
            }
        } else {
            // TODO: Error handling
            console.log(result);
        }
    }

    const projectBasicInfo = [{
            label: 'RECRUITMENT STATUS',
            value: project.activelyRecruiting ? 'Actively Recruiting' : 'Not Actively Recruiting'
        }, {
            label: 'MEETING CADENCE',
            value: project.meetingCadence || "No meeting cadence has been set." 
        }, {
            label: 'SUMMARY',
            value: project.description
        }
    ];

    const projectRecruitmentInfo = [{
        label: 'CURRENT NEEDS',
        value: project.currentNeeds ? project.currentNeeds.join(', ') : '--'
    }, {
        label: 'GOOD FIT FOR',
        value: project.goodFitFor
    }, {
        label: 'TECH',
        value: project.tech
    }];

    const additionalInfo = [{
        label: 'PROBLEM STATEMENT',
        value: project.problemStatement || "No problem statement has been set."
    }, {
        label: 'DELIVERABLES',
        value: project.deliverables ? project.deliverables.join(', ') : "No deliverables have been set."
    }, {
        label: 'COMMENTS',
        value: project.comment ? project.comment : 'No comments have been added.'
    }];

    const links = project.Links ? project.Links.map((link) => ({ label: link.title, value: link.url, type: 'link' })) : [];

    // Form Fields
    const basicInfoEdit = [{
        type: 'radio',
        options: [{
            value: "true", text: 'Actively Recruiting'}, {
            value: "false", text: 'Not Actively Recruiting'}],
        name: 'activelyRecruiting',
        label: 'Recruitment Status',
        currentValue: newProjectRecruitStatus
    }, {
        type: 'textfield',
        currentValue: newProjectMeetingCadence,
        label: 'Meeting Cadence',
        name: 'meetingCadence'
    }, {
        type: 'textfield',
        currentValue: newProjectSummary,
        label: 'Summary',
        name: 'summary'
    }];

    const recruitmentEdit = [{
        type: 'checkbox',
        label: 'Current Needs',
        name: 'currentNeeds',
        options: skills.map((skill) => ({ value: skill.name, text: skill.name })),
        currentValues: newProjectCurrentNeeds,
        onChange: currentNeedsListener
    }, {
        type: 'textfield',
        label: 'Good Fit For',
        name: 'goodFitFor',
        currentValue: newProjectFit
    }, {
        type: 'textfield',
        label: 'Tech',
        name: 'tech',
        currentValue: newProjectTech
    }];

    const additionalInfoEdit = [{
        type: 'textfield',
        label: 'Problem Statement',
        currentValue: newProjectStatement,
        name: "problemStatement"
    }, {
        type: 'textfield',
        label: 'Deliverables',
        currentValue: newProjectDeliverables,
        name: "deliverables"
    }, {
        type: 'textfield',
        label: 'Comments',
        currentValue: newProjectComment,
        name: "comment"
    }];

    // const linksEdit = newProjectLinks ? 
    //     newProjectLinks.map((link) => ( {...link, type: 'link', deleteLink, linkListener })) 
    //     : 
    //     [];

    // const linkBoxFields = [
    //     ...linksEdit,
    //     { type: 'button', onClick: createLink }
    // ];

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
            tagTimeslotToDelete={tagTimeslotToDelete}
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
        <div key="settings">Settings</div>
    ];

    return (
        <ContentBox 
            headContent={<h1>{project.name}</h1>}
            links={["Overview", "Recruitment", "Project Info", "Links", "Settings"]}
            variant="large"
            bodyContent={bodyContent}
            footContent={<VolunteerModalFooter 
                            visible
                            isEditing={isEditing}
                            editInfo={() => setIsEditing(true)}
                            saveInfo={saveProject}
                        />}
            marginTop
            hideScroll
        />
        // <ProjectInfoContainer>P

        //     {UserAuth.isAuthenticated() && <ProjectInfoSwitcher editing={isEditing} showEditForm={showEditForm} saveProject={saveProject} /> }
        //     {!isEditing ?
        //         <>
        //             <ProjectInfoBox header={project.name} mainHeader fields={projectBasicInfo} />
        //             <ProjectInfoBox header="Recruitment" fields={projectRecruitmentInfo} />
        //             <ProjectInfoBox header="Additional Info" fields={additionalInfo} />
        //             <ProjectInfoBox header="Links" fields={links} />
        //         </>
        //         : 
        //         <>
        //             <ProjectinfoEditableBox 
        //                 header={newProjectName} 
        //                 mainHeader 
        //                 fields={basicInfoEdit} 
        //                 onChange={changeListener} 
        //             />
        //             <ProjectinfoEditableBox 
        //                 header="Recruitment"
        //                 onChange={changeListener}
        //                 fields={recruitmentEdit}
        //             />
        //             <ProjectinfoEditableBox
        //                 header="Additional Info"
        //                 onChange={changeListener}
        //                 fields={additionalInfoEdit}
        //             />
        //             <ProjectinfoEditableBox
        //                 header="Links"
        //                 onChange={() => {}}
        //                 fields={linkBoxFields}
        //             />
        //         </>
        //     }
        // </ProjectInfoContainer>
    );
};

export default NewProjectContainer;
