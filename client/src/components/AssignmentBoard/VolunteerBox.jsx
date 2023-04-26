import React, { useState } from 'react';
import { Box } from '@mui/material';
import {HiOutlineBellAlert} from 'react-icons/hi2';
import { BellIconStyle } from '../../styles/components/VolunteerModal.style';
import VolunteerModal from './VolunteerModal/VolunteerModal';
import Label from './VolunteerModal/Label';
import { useStyles } from '../../styles/components/Boxes';
import { skillLabels } from '../../lib/Skills';


const VolunteerBox = ({ volunteer, projects, handleShowIndicator, handleViewedLS}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const showIndicator = handleShowIndicator && handleShowIndicator(volunteer.id)
    const skill = volunteer.skills[0]?.name
    const skillDetails = {
       name: skillLabels[skill]?.name,
       color: skillLabels[skill]?.color,
       background: skillLabels[skill]?.backgroundColor
    }
    
    const openModal = () => {
        if (showIndicator) {
            handleViewedLS(volunteer.id)
        }
        setModalOpen(true);
    }

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
                <Box>
                {showIndicator ? <BellIconStyle><HiOutlineBellAlert size={20}/></BellIconStyle> : null}
                <div>
                    {volunteer.name || 'Volunteer Name'}
                    <Label labelStyle={classes.skillLabel} nameStyle={classes.skillName} colors={{color: skillDetails.color, background: skillDetails.background}} labelName={skillDetails.name}/>
                </div>
                </Box>
            </Box>
        </>
    )
};

export default VolunteerBox;
