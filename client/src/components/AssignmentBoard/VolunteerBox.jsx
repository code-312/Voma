import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/material';
import VolunteerModal from './VolunteerModal/VolunteerModal';

const useStyles = makeStyles({
    volunteerName: {
        borderRadius: '4px',
        backgroundColor: 'white',
        cursor: 'pointer',
        padding: '12px',
        width: '100%',
        marginBottom: '16px',
        boxShadow: '0px 1px 1px rgba(0,0,0,0.14), 0px 2px 1px rgba(0,0,0,0.12), 0px 1px 3px rgba(0,0,0,0.2);',
        '&.active': {
            backgroundColor: 'rgba(98, 0, 238, 0.08)',
            border: '1px solid #6200ee',
        }
    },
});

const VolunteerBox = ({ volunteer }) => {
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const classes = useStyles();
    return (
        <>
            <VolunteerModal volunteer={volunteer} modalOpen={modalOpen} closeModal={closeModal} />
            <Box className={classes.volunteerName} onClick={openModal} closeModal={closeModal}>
                <Box>{volunteer.name || 'Volunteer Name'}</Box>
            </Box>
        </>
    )
};

export default VolunteerBox;
