import React from 'react';
import { Typography } from '@mui/material';
import { VolunteerSidebarTabContainer } from '../../../styles/components/VolunteerModal.style';

const VolunteerModalTab = ({ Icon, label, onClick, active, index }) => {
    const changeTab = () => {
        onClick(index);
    }

    const changeTabKey = (e) => {
        const { key } = e;
        if (key === 'Enter') {
            onClick(index);
        }
    }

    return ( 
        <VolunteerSidebarTabContainer onClick={changeTab} onKeyDown={changeTabKey} $active={active} tabIndex={0}>
           <Icon />
            <Typography variant="subtitle-2">
                {label}
            </Typography>
        </VolunteerSidebarTabContainer>
    );
}

export default VolunteerModalTab;