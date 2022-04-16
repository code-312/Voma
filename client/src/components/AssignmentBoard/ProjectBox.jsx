import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';


export default function ProjectBoard({ volunteers, project, classes }) {
    const [isActive, setIsActive] = useState(false);

    return (
        <Box 
            className={classes.projectCard} 
            mt="8px" 
            mb="16px">

            <Typography variant="h6" mb="16px">{project.name}</Typography>

            {isActive &&
                <Box class={classes.projectCardButton}>
                    <Box>INSERT VOLUNTEER</Box>
                </Box>
            }

            <hr />

            <Box className={classes.volunteerName}>
                <Box>Volunteer Name</Box>
            </Box>
            <Box className={classes.volunteerName}>
                <Box>Volunteer Name</Box>
            </Box>
            <Box className={classes.volunteerName}>
                <Box>Volunteer Name</Box>
            </Box>
            <Box className={classes.volunteerName}>
                <Box>Volunteer Name</Box>
            </Box>

        </Box>
    );
}
