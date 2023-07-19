import React from 'react';
import { Link } from 'react-router-dom'
import { Box, Typography } from '@mui/material';
import VolunteerCard from './VolunteerCard';

export default function ProjectContainer({ volunteers, project, classes, projects }) {
    return (
        <Box 
            className={classes.projectCard} 
            mt="8px" 
            mb="16px">
                
            <Link to={`/projects?selected=${project.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography variant="h6" mb="16px">{project.name}</Typography>
            </Link>

            <hr />

            {volunteers.map((volunteer) => (
                <VolunteerCard
                    key={`volunteer-${volunteer.id}`}
                    volunteer={volunteer} 
                    projects={projects}
                />
            ))}

        </Box>
    );
}
