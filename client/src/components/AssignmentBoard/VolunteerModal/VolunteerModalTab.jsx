import React from 'react';
import { Typography } from '@mui/material';
import { VolunteerSidebarTabContainer } from '../../../styles/components/VolunteerModal.style';

const VolunteerModalTab = ({ icon, text, onClick, active}) => (
        <VolunteerSidebarTabContainer onClick={onClick} active={active}>
            { icon }
            <Typography variant="subtitle-2">
                {text}
            </Typography>
        </VolunteerSidebarTabContainer>
    );

export default VolunteerModalTab;