import React from 'react';
import Accordion from '../Accordion';
import Button from '../Button';
import { Label1, BodySubText, Label3 } from '../../styles/components/Typography';
import { ArchiveHeader, ArchiveFooter } from '../../styles/pages/ArchivePage.style';

const ArchiveAccordion = ({ project, triggerDeleteModal, triggerReactivateModal }) => {
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
            <ArchiveFooter>
                <Button 
                    variant="solid blue" 
                    onClick={() => triggerReactivateModal(project.id)}>
                        Add to Projects
                    </Button>
                <Button 
                    variant="solid red" 
                    onClick={() => triggerDeleteModal(project.id)}>
                        Delete
                    </Button>
            </ArchiveFooter>
        </Accordion>
    );
};

export default ArchiveAccordion;
