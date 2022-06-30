import React from 'react';
import { Box, Typography } from '@mui/material';
import { useStyles } from '../../styles/components/Boxes';

export default function ProjectBox({ project, onClick }) {
    const classes = useStyles();
    return (
        <Box xw
            mt="8px" 
            mb="16px"
            onClick={onClick}
            className={classes.volunteerName}
        >

            <Typography variant="h6" mb="16px">{project.name}</Typography>
        </Box>
    );
}
