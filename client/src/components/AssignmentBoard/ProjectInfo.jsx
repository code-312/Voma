import React from 'react';
import { Typography } from "@mui/material";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    projectInfoHeader: {
        marginTop: '15px',
        textAlign: 'center'
    },
    projectInfoContainer: {
        display: 'flex',
        padding: '10px',
        justifyContent: 'space-between'
    },
    projectInfoLabel: {
        flex: 1,
        margin: '15px',
    }, 
    projectInfoField: {
        backgroundColor: 'white',
        borderRadius: '10px',
        flex: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const ProjectInfo = ({ project }) => {
    const classes = useStyles();
    return (
        <>
            <Typography class={classes.projectInfoHeader} align="center" component="h1" variant="h4">{project.name}</Typography>
            <div className={classes.projectInfoContainer}>
                <div className={classes.projectInfoLabel}>
                    <Typography align="left" paragraph>Summary:</Typography>
                </div>
                <div className={classes.projectInfoField}><p>{project.description}</p></div>
            </div>
            <div className={classes.projectInfoContainer}>
                <div className={classes.projectInfoLabel}>
                    <Typography align="left" paragraph>Recruitment Status:</Typography>
                </div>
                <div className={classes.projectInfoField}><p>{project.activelyRecruiting ? 'Actively Recruiting' : 'Not Actively Recruiting'}</p></div>
            </div>
            <div className={classes.projectInfoContainer}>
                <div className={classes.projectInfoLabel}>
                    <Typography align="left" paragraph>Current Needs:</Typography>
                </div>
                <div className={classes.projectInfoField}><p>{project.currentNeeds ? project.currentNeeds.join(', ') : '--'}</p></div>
            </div>
            <div className={classes.projectInfoContainer}>
                <div className={classes.projectInfoLabel}>
                    <Typography align="left" paragraph>Meeting Cadence:</Typography>
                </div>
                <div className={classes.projectInfoField}><p>Need to add this still</p></div>
            </div>
            <div className={classes.projectInfoContainer}>
                <div className={classes.projectInfoLabel}>
                    <Typography align="left" paragraph>Good Fit For:</Typography>
                </div>
                <div className={classes.projectInfoField}><p>{project.goodFitFor}</p></div>
            </div>
            <div className={classes.projectInfoContainer}>
                <div className={classes.projectInfoLabel}>
                    <Typography align="left" paragraph>Tech:</Typography>
                </div>
                <div className={classes.projectInfoField}><p>{project.tech}</p></div>
            </div>
        </>
    );
};

export default ProjectInfo;
