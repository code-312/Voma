import React, { useState } from 'react';
import { Box } from '@mui/material';
import VolunteerModal from './VolunteerModal/VolunteerModal';
import { useStyles } from '../../styles/components/Boxes';

const VolunteerBox = ({ volunteer, projects }) => {
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const modalOpenKeyPress = (e) => {
        const { key } = e;
        if (key === 'Enter') {
            openModal();
        }
    }

    const classes = useStyles();
    return (
        <>
            <VolunteerModal 
                volunteer={volunteer} 
                modalOpen={modalOpen} 
                closeModal={closeModal} 
                projects={projects} 
            />
            <Box 
                tabIndex={0} 
                onKeyDown={modalOpenKeyPress} 
                className={classes.volunteerName} 
                onClick={openModal} 
                closeModal={closeModal}
            >
                <Box>{volunteer.name || 'Volunteer Name'}</Box>
            </Box>
        </>
    )
};

export default VolunteerBox;
