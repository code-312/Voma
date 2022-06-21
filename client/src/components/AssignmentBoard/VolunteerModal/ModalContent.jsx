import React from 'react';
import ProjectAssignment from './content/ProjectAssignment';
import Tasks from './content/Tasks';
import GeneralContent from './content/GeneralContent';

const ModalContent = ({ volunteer, activeTab }) => {
    const summary = [
        { label: 'Slack User Id', value: volunteer.slackUserId }, 
        { label: 'Email address', value: volunteer.email },
        { label: 'Pronouns', value: volunteer.pronouns },
    ];
    const skillName = volunteer.skills.length > 0 ? volunteer.skills[0].name : "No Skills";
    const skills = [
        { label: 'role', value: skillName } // TODO: Get this working dummy
    ];
    const credentials = [
        { label: 'employer', value: volunteer.employer },
        { label: 'Are you a student?', value: volunteer.student ? 'Yes' : 'No' },
        { label: 'Job title', value: volunteer.jobTitle }
    ]

   return ( 
        <>
            { activeTab === 0 && <GeneralContent fields={summary} title="Summary" />}
            { activeTab === 1 && <Tasks tasks={volunteer.completedTasks} />}
            { activeTab === 2 && <GeneralContent fields={skills} title="Skills" /> }
            { activeTab === 3 && <GeneralContent title="Credentials" fields={credentials} />}
            { activeTab === 4 && <ProjectAssignment volunteer={volunteer} />}
        </>
   );
}

export default ModalContent;
