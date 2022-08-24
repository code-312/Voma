import React from 'react';
import { Box, Typography } from '@mui/material';
import VolunteerBox from './VolunteerBox';

export default function ProjectContainer({ volunteers, project, classes, projects }) {
    return (
        <Box 
            className={classes.projectCard} 
            mt="8px" 
            mb="16px">

            <Typography variant="h6" mb="16px">{project.name}</Typography>

            <hr />

            {volunteers.map((volunteer) => (
                <VolunteerBox
                    key={`volunteer-${volunteer.id}`}
                    volunteer={volunteer} 
                    projects={projects}
                />
            ))}

        </Box>
    );
}
