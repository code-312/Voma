import React from 'react';
import Accordion from '../Accordion';
import { Label1, BodySubText, Label3 } from '../../styles/components/Typography';
import { ArchiveHeader } from '../../styles/pages/ArchivePage.style';

const ArchiveAccordion = ({ project }) => {
    const headerContent = (
        <ArchiveHeader>
            <Label1>{project.name}</Label1>
            <BodySubText>Date Archived: {new Date(project.updatedAt).toLocaleString('en-US')}</BodySubText>
        </ArchiveHeader>
    );

    return (
        <Accordion header={headerContent}>
            <Label3>Summary</Label3>
            <p>{project.description}</p>
        </Accordion>
    );
};

export default ArchiveAccordion;
