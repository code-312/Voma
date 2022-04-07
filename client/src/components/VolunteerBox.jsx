import React from 'react';
import { Box } from '@mui/material';

const VolunteerBox = ({ volunteer, classes }) => (
        <Box class={classes}>
            <Box>{volunteer.name || 'Volunteer Name'}</Box>
        </Box>
    );

export default VolunteerBox;
