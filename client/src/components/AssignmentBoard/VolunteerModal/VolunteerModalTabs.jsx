import React from 'react';
import VolunteerModalTab from './VolunteerModalTab';
import { ReactComponent as Credentials } from '../../../assets/credentials.svg';
import { ReactComponent as ProjectAssignment } from '../../../assets/project-assignment.svg';
import { ReactComponent as Skills } from '../../../assets/skills.svg';
import { ReactComponent as Tasks } from '../../../assets/tasks.svg';
import { ReactComponent as Summary } from '../../../assets/summary.svg';

const VolunteerModalTabs = ({ activeTab, setActiveTab }) => {
    const updateTab = (index) => {
        setActiveTab(index);
    }

    return (
        <>
            <VolunteerModalTab 
                onClick={updateTab}
                index={0}
                active={activeTab === 0} 
                label="Summary" 
                Icon={Summary}
            />
            <VolunteerModalTab 
                onClick={updateTab}
                index={1}
                active={activeTab === 1} 
                label="Tasks" 
                Icon={Tasks} 
            />
            <VolunteerModalTab 
                onClick={updateTab}
                index={2}
                active={activeTab === 2} 
                label="Skills" 
                Icon={Skills} 
            />
            <VolunteerModalTab 
                onClick={updateTab}
                index={3}
                active={activeTab === 3} 
                label="Credentials" 
                Icon={Credentials} 
            />
            <VolunteerModalTab 
                onClick={updateTab}
                index={4}
                active={activeTab === 4} 
                label="Project Assignment" 
                Icon={ProjectAssignment} 
            />
        </>
        );
}

export default VolunteerModalTabs;
