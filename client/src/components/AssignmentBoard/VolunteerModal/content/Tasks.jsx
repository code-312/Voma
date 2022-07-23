import React from 'react';
import Typography from '@mui/material/Typography';
import { VolunteerTabTable } from '../../../../styles/components/VolunteerModal.style';

const Tasks = ({ tasks }) => {
    // Need to store these tasks in a constant file somewhere
    const watchObVideo = "Watch onboarding videos";
    const submitPasscode = "Submit passcode validation";
    const skillsSurvey = "Submit skills survey";
    
    return (
        <>
        <Typography variant="h6" component="h2" gutterBottom>
            Tasks
        </Typography>
        <VolunteerTabTable>
            <thead>
                <tr>
                    <th>Status</th>
                    <th>Task</th>
                    <th>Date Completed</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{tasks.indexOf(watchObVideo) !== -1 ? 'Completed' : 'Not Started'}</td>
                    <td>{watchObVideo}</td>
                    <td>- -</td>
                </tr>
                <tr>
                    <td>{tasks.indexOf(submitPasscode) !== -1 ? 'Completed' : 'Not Started'}</td>
                    <td>{submitPasscode}</td>
                    <td>- -</td>
                </tr>
                <tr>
                    <td>{tasks.indexOf(skillsSurvey) !== -1 ? 'Completed' : 'Not Started'}</td>
                    <td>{skillsSurvey}</td>
                    <td>- -</td>
                </tr>
            </tbody>
        </VolunteerTabTable>
        </>
    );
}

export default Tasks;
