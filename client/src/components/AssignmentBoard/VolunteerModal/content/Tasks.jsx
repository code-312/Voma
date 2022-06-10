import React from 'react';
import Typography from '@mui/material/Typography';

const Tasks = ({ volunteer }) => (
        <>
        <Typography variant="h6" component="h2" gutterBottom>
            Tasks
        </Typography>
        <Typography variant="overline">Slack User Id</Typography>
        <Typography variant="subtitle-1" paragraph>Completed Tasks Here</Typography>
        </>
    );

export default Tasks;
