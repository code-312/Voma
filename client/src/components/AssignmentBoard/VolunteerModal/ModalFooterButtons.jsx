import React from 'react';
import Button from '@mui/material/Button';
import { VolunteerModalFooter } from '../../../styles/components/VolunteerModal.style';

const ModalFooterStandardButtons = ({ standard, closeModal, assignVolunteerToProject }) => (
        <VolunteerModalFooter>
            { standard ? 
  
                <Button variant="text" disabled>Edit</Button>
            :
                <Button variant="text" onClick={assignVolunteerToProject}>Assign</Button>
            }
            <Button variant="text" onClick={closeModal}>Close</Button>
        </VolunteerModalFooter>
    );

export default ModalFooterStandardButtons;
