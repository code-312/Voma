import React from 'react';
import { Typography } from "@mui/material";
import { makeStyles } from '@mui/styles';
import ProjectInfoSwitcher from './ProjectInfoSwitcher';
import ProjectInfoBox from './ProjectInfoBox';
import { ProjectInfoContainer } from '../../styles/pages/ProjectPage.style';

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
    console.log(project);
    const projectBasicInfo = [{
            label: 'RECRUITMENT STATUS',
            value: project.activelyRecruiting ? 'Actively Recruiting' : 'Not Actively Recruiting'
        }, {
            label: 'MEETING CADENCE',
            value: 'Every other Monday at 6pm' // TODO: Replace with actual meeting cadence
        }, {
            label: 'SUMMARY',
            value: project.description
        }
    ];

    const projectRecruitmentInfo = [{
        label: 'CURRENT NEEDS',
        value: project.currentNeeds ? project.currentNeeds.join(', ') : '--'
    }, {
        label: 'GOOD FIT FOR',
        value: project.goodFitFor
    }, {
        label: 'TECH',
        value: project.tech
    }];

    const additionalInfo = [{
        label: 'PROBLEM STATEMENT',
        value: "Currently, BT's staff can only make content changes on the website, but not to the layout. If they want to make changes beyond content then they would need a Developer to make these changes for them. Since they don’t have any web development staff on-hand, this poses a challenge for them to sustain and scale their website in the long term. Additionally, Joe suspects that their primary users, donors and DM clients, are not leveraging their website for their primary tasks and wants to identify a way to improve this experience for them."
    }, {
        label: 'DELIVERABLES',
        value: 'Deliverables.'
    }, {
        label: 'COMMENTS',
        value: project.comment ? project.comment : 'No comments have been added.'
    }];


    // const classes = useStyles();
    return (
        <>
            <ProjectInfoContainer>
                <ProjectInfoSwitcher editing />
                <ProjectInfoBox header={project.name} mainHeader fields={projectBasicInfo} />
                <ProjectInfoBox header="Recruitment" fields={projectRecruitmentInfo} />
                <ProjectInfoBox header="Additional Info" fields={additionalInfo} />
            </ProjectInfoContainer>
            {/* <Typography class={classes.projectInfoHeader} align="center" component="h1" variant="h4">{project.name}</Typography>
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
            </div> */}
        </>
    );
};

export default ProjectInfo;
