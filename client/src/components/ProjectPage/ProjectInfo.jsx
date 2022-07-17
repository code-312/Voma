import React from 'react';
import ProjectInfoSwitcher from './ProjectInfoSwitcher';
import ProjectInfoBox from './ProjectInfoBox';
import { ProjectInfoContainer } from '../../styles/pages/ProjectPage.style';

const ProjectInfo = ({ project }) => {
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

    const links = project.Links.map((link) => ({ label: link.title, value: link.url, type: 'link' }))

    return (
        <>
            <ProjectInfoContainer>
                <ProjectInfoSwitcher editing />
                <ProjectInfoBox header={project.name} mainHeader fields={projectBasicInfo} />
                <ProjectInfoBox header="Recruitment" fields={projectRecruitmentInfo} />
                <ProjectInfoBox header="Additional Info" fields={additionalInfo} />
                <ProjectInfoBox header="Links" fields={links} />
            </ProjectInfoContainer>
        </>
    );
};

export default ProjectInfo;
