import React from 'react';
import Modal from '../Modal';
import { archiveProject } from '../../lib/Requests';
import { ButtonStyle } from '../../styles/components/Button.style';
import { Card } from '../../styles/components/Card.style';
import { Label3 } from '../../styles/components/Typography';
import { NewProjectModalFooter } from '../../styles/pages/ProjectPage.style';

const ArchiveProjectModal = ({ isOpen, closeFn, id }) => {
    const archiveProjectRec = async () => {
        const result = await archiveProject(id);
        if (result) {
            window.location.href = "/archive";
        }
    }

    return (
        <Modal isOpen={isOpen} closeFn={closeFn}>
            <Card small>
                <h2>Archive Project?</h2>
                <Label3>Are you sure you want to archive this project?</Label3>
                <NewProjectModalFooter>
                    <ButtonStyle 
                        variant="solid blue" 
                        onClick={archiveProjectRec}>
                            Archive
                    </ButtonStyle>
                    <ButtonStyle 
                        variant="solid white"
                        onClick={closeFn}>
                            Cancel
                    </ButtonStyle>
                </NewProjectModalFooter>
            </Card>
        </Modal>
    )

};

export default ArchiveProjectModal;
