import React from 'react';
import { Card } from '../../styles/components/Card.style';
import ArchiveAccordion from './ArchiveAccordion';

const ArchiveContainer = ({ projects }) => (
    <Card>
        <h1>Archive Library</h1>
        
        {projects.length > 0 ?  (projects.map((project) => <ArchiveAccordion key={project.id} project={project} /> )) 
        :
        <h4>No projects have been archived.</h4>
        }
    </Card>
);

export default ArchiveContainer;
