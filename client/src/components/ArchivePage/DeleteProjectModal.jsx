import React from 'react';
import Modal from '../Modal';
import { removeProject } from '../../lib/Requests';
import { ButtonStyle } from '../../styles/components/Button.style';
import { Card } from '../../styles/components/Card.style';
import { Label3 } from '../../styles/components/Typography';
import { NewProjectModalFooter } from '../../styles/pages/ProjectPage.style';

const DeleteProjectModal = ({ isOpen, closeFn, selectedProject }) => {

    const deleteProject = async () => {
        if (selectedProject) {
            const result = await removeProject(selectedProject);
            if (result) {
                window.location.reload();
            }
        }
    }

    return (
        <Modal isOpen={isOpen} closeFn={closeFn}>
            <Card small>
                <h2>Delete Project?</h2>
                <Label3>Are you sure you want to delete this project?</Label3>
                <NewProjectModalFooter>
                    <ButtonStyle 
                        variant="solid red" 
                        onClick={deleteProject}>
                            Delete
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

export default DeleteProjectModal;
