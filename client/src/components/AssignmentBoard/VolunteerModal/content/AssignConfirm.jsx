import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ProjectSkillContainer, PseudoLinkContainer, ConfirmContainer, ConfirmButtonContainer } from '../../../../styles/components/VolunteerModal.style';
import { PseudoLink, Label3 } from '../../../../styles/components/Typography';
import Button from '../../../Button';

const AssignConfirm = ({ project, volunteer, toggleAssign }) => (
    <div>
        <PseudoLinkContainer>
            <ArrowLeft />
            <PseudoLink onClick={toggleAssign}>Back to project selection</PseudoLink>
        </PseudoLinkContainer>
        <div>
            <Label3>Are you sure you want to assign {volunteer.name} to {project ? project.name : 'this project'}?</Label3>
            <ConfirmButtonContainer>
                <Button variant="solid blue">Yes</Button>
                <Button variant="solid white" onClick={toggleAssign}>No</Button>
            </ConfirmButtonContainer>
        </div>
    </div>
);


export default AssignConfirm;