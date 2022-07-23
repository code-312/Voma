import React, { useState, useEffect } from 'react';
import ProjectInfoSwitcher from './ProjectInfoSwitcher';
import ProjectInfoBox from './ProjectInfoBox';
import ProjectinfoEditableBox from './ProjectInfoEditableBox';
import { ProjectInfoContainer } from '../../styles/pages/ProjectPage.style';
import { editProject } from '../../lib/Requests';

const ProjectInfo = ({ project, skills }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newProjectName, setNewProjectName] = useState("");
    const [newProjectRecruitStatus, setNewProjectRecruitStatus] = useState("false");
    const [newProjectMeetingCadence, setNewProjectMeetingCadence] = useState("Mondays at 6pm");
    const [newProjectSummary, setNewProjectSummary] = useState("");
    const [newProjectCurrentNeeds, setNewProjectCurrentNeeds] = useState([])
    const [newProjectFit, setNewProjectFit] = useState("");
    const [newProjectTech, setNewProjectTech] = useState("");
    const [newProjectStatement, setNewProjectStatement] = useState("");
    const [newProjectDeliverables, setNewProjectDeliverables] = useState("");
    const [newProjectComment, setNewProjectComment] = useState("");
    const [newProjectLinks, setNewProjectLinks] = useState([]);


    useEffect(() => {
        setNewProjectName(project.name);
        setNewProjectRecruitStatus(`${project.activelyRecruiting}`);
        setNewProjectSummary(project.description);
        setNewProjectCurrentNeeds(project.currentNeeds);
        setNewProjectFit(project.goodFitFor);
        setNewProjectTech(project.tech);
        setNewProjectComment(project.comment);
        setNewProjectLinks(project.Links)
    }, [project]);

    const showEditForm = () => {
        setIsEditing(true);
    }

    const saveProject = async () => {
        const newProject = {
            name: newProjectName,
            description: newProjectSummary,
            currentNeeds: newProjectCurrentNeeds,
            activelyRecruiting: newProjectRecruitStatus === 'true',
            tech: newProjectTech,
            goodFitFor: newProjectFit,
            comment: newProjectComment
        };

        const result = await editProject(newProject, project.id);
        if (result === true) {
            window.location.reload();
        } else {
            // TODO: Error handling
            console.log(result);
        }
    }

    const fieldToStateMapper = {
        projectName: setNewProjectName,
        activelyRecruiting: setNewProjectRecruitStatus,
        meetingCadence: setNewProjectMeetingCadence,
        summary: setNewProjectSummary,
        goodFitFor: setNewProjectFit,
        tech: setNewProjectTech,
        problemStatement: setNewProjectStatement,
        deliverables: setNewProjectDeliverables,
        comment: setNewProjectComment,
    };

    const changeListener = (e) => {
        const stateSetter = fieldToStateMapper[e.currentTarget.name];
        stateSetter(e.currentTarget.value);
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

    const projectBasicInfo = [{
            label: 'RECRUITMENT STATUS',
            value: project.activelyRecruiting ? 'Actively Recruiting' : 'Not Actively Recruiting'
        }, {
            label: 'MEETING CADENCE',
            value: 'Every other Monday at 6pm' // TODO: Replace with actual meeting cadence
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
        value: "Currently, BT's staff can only make content changes on the website, but not to the layout. If they want to make changes beyond content then they would need a Developer to make these changes for them. Since they don’t have any web development staff on-hand, this poses a challenge for them to sustain and scale their website in the long term. Additionally, Joe suspects that their primary users, donors and DM clients, are not leveraging their website for their primary tasks and wants to identify a way to improve this experience for them."
    }, {
        label: 'DELIVERABLES',
        value: 'Deliverables.'
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

    const linksEdit = newProjectLinks ? 
        newProjectLinks.map((link) => ( {...link, type: 'link' })) 
        : 
        [];

    if (!project) {
        return null;
    }

    return (
        <ProjectInfoContainer>
            <ProjectInfoSwitcher editing={isEditing} showEditForm={showEditForm} saveProject={saveProject} />
            {!isEditing ?
                <>
                    <ProjectInfoBox header={project.name} mainHeader fields={projectBasicInfo} />
                    <ProjectInfoBox header="Recruitment" fields={projectRecruitmentInfo} />
                    <ProjectInfoBox header="Additional Info" fields={additionalInfo} />
                    <ProjectInfoBox header="Links" fields={links} />
                </>
                : 
                <>
                    <ProjectinfoEditableBox 
                        header={newProjectName} 
                        mainHeader 
                        fields={basicInfoEdit} 
                        onChange={changeListener} 
                    />
                    <ProjectinfoEditableBox 
                        header="Recruitment"
                        onChange={changeListener}
                        fields={recruitmentEdit}
                    />
                    <ProjectinfoEditableBox
                        header="Additional Info"
                        onChange={changeListener}
                        fields={additionalInfoEdit}
                    />
                    <ProjectinfoEditableBox
                        header="Links"
                        onChange={() => {}}
                        fields={linksEdit}
                    />
                </>
            }
        </ProjectInfoContainer>
    );
};

export default ProjectInfo;
