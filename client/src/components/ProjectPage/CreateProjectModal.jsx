import React, { useState } from 'react';
import Modal from '../Modal';
import { ButtonStyle } from '../../styles/components/Button.style';
import { StyledInput } from '../../styles/components/Input.style';
import { Card } from '../../styles/components/Card.style';
import { Label3 } from '../../styles/components/Typography';
import { NewProjectModalFooter } from '../../styles/pages/ProjectPage.style';

const CreateProjectModal = ({ isOpen, closeFn }) => {
    const [title, setTitle] = useState("");

    const updateTitle = (e) => {
        setTitle(e.currentTarget.value);
    }
    const saveProject = () => {
        console.log('savin');
    }

    return (
        <Modal isOpen={isOpen} closeFn={closeFn}>
            <Card small>
                <h2>Please Enter a Project Name</h2>
                <Label3>Project Title*</Label3>
                <StyledInput value={title} onChange={updateTitle} />
                <NewProjectModalFooter>
                    <ButtonStyle 
                        variant="solid blue" 
                        onClick={saveProject}>
                            Save
                    </ButtonStyle>
                    <ButtonStyle 
                        variant="solid white"
                        onClick={closeFn}>
                            Exit
                    </ButtonStyle>
                </NewProjectModalFooter>
            </Card>
        </Modal>
    )

};

export default CreateProjectModal;
