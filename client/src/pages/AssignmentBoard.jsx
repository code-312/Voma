import { useContext } from 'react';
import { Grid, Box, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { deepPurple } from '@mui/material/colors';

import { AuthContext } from '../lib/AuthProvider';

const useStyles = makeStyles({
    sidebar: {
        overflowY: 'scroll',
        paddingLeft: '16px',
        paddingRight: '24px',
        minHeight: 'calc(100vh - 64px)',
        maxHeight: 'calc(100vh - 64px)',
        marginTop: '-32px',
        backgroundColor: 'rgba(98, 0, 238, 0.08)',
        '& .MuiBox-root': {
            display: 'inline-block',
        },
        '& input': {
            textAlign: 'right',
        }
    },
    volunteerName: {
        borderRadius: '4px',
        backgroundColor: 'white',
        cursor: 'pointer',
        padding: '12px',
        marginBottom: '16px',
        boxShadow: '0px 1px 1px rgba(0,0,0,0.14), 0px 2px 1px rgba(0,0,0,0.12), 0px 1px 3px rgba(0,0,0,0.2);',
        '&.active': {
            backgroundColor: 'rgba(98, 0, 238, 0.08)',
            border: '1px solid #6200ee',
        }
    },
    board: {
        overflowX: 'scroll',
        paddingRight: '24px',
        marginTop: '-32px',
        width: 'calc(100vw - 272px)',
        maxWidth: 'calc(100vw - 272px)',
        '& > .MuiBox-root': {
            marginLeft: '9px',
        },
        '& > .MuiBox-root ~ .MuiBox-root': {
            marginLeft: '16px',
        }
    },
    projectCard: {
        width: '248px',
        borderRadius: '4px',
        display: 'inline-block',
        padding: '12px',
        whitespace: 'normal',
        verticalAlign: 'top',
        backgroundColor: 'rgba(255,255,255,0.38)',
        boxShadow: '0px 1px 1px rgba(0,0,0,0.14), 0px 2px 1px rgba(0,0,0,0.12), 0px 1px 3px rgba(0,0,0,0.2);',
        '& hr': {
            marginBottom: '16px',
            border: '1px solid #6200ee',
        },
        '&.active': {
            border: '1px solid #6200ee',
            backgroundColor: 'rgba(98, 0, 238, 0.08)',
        }
    },
    projectCardButton: {
        borderRadius: '4px',
        cursor: 'pointer',
        padding: '12px',
        marginBottom: '16px',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: '14px',
        letterSpacing: '1.25px',
        fontWeight: '500',
        backgroundColor: deepPurple.A700,
    }
})

export default function AssignmentBoard() {
    const UserAuth = useContext(AuthContext);

    const classes = useStyles();

    return (<>
        <Grid container justifyContent="flex-box">
            <Grid item md={2} className={classes.sidebar}>
                <Typography variant="h6" mt="24px" mb="16px">Currently Onboarding</Typography>

                <Box class={`${classes.volunteerName} active`}>
                    <Box>Volunteer Name</Box>
                </Box>
                <Box class={classes.volunteerName}>
                    <Box>Volunteer Name</Box>
                </Box>
                <Box class={classes.volunteerName}>
                    <Box>Volunteer Name</Box>
                </Box>
                <Box class={classes.volunteerName}>
                    <Box>Volunteer Name</Box>
                </Box>
                <Box class={classes.volunteerName}>
                    <Box>Volunteer Name</Box>
                </Box>
                <Box class={classes.volunteerName}>
                    <Box>Volunteer Name</Box>
                </Box>
                <Box class={classes.volunteerName}>
                    <Box>Volunteer Name</Box>
                </Box>
                <Box class={classes.volunteerName}>
                    <Box>Volunteer Name</Box>
                </Box>
                <Box class={classes.volunteerName}>
                    <Box>Volunteer Name</Box>
                </Box>
                <Box class={classes.volunteerName}>
                    <Box>Volunteer Name</Box>
                </Box>
                <Box class={classes.volunteerName}>
                    <Box>Volunteer Name</Box>
                </Box>
                <Box class={classes.volunteerName}>
                    <Box>Volunteer Name</Box>
                </Box>
                <Box class={classes.volunteerName}>
                    <Box>Volunteer Name</Box>
                </Box>
                <Box class={classes.volunteerName}>
                    <Box>Volunteer Name</Box>
                </Box>
                <Box class={classes.volunteerName}>
                    <Box>Volunteer Name</Box>
                </Box>
                <Box class={classes.volunteerName}>
                    <Box>Volunteer Name</Box>
                </Box>
                <Box class={classes.volunteerName}>
                    <Box>Volunteer Name</Box>
                </Box>
                <Box class={classes.volunteerName}>
                    <Box>Volunteer Name</Box>
                </Box>
            </Grid>
            
            <Grid item md={10} className={classes.board} sx={{ whiteSpace: 'nowrap' }}>

                <Box className={`${classes.projectCard} active`} mt="8px" mb="16px">
                    <Typography variant="h6" mb="16px">Project Name</Typography>

                    <Box class={classes.projectCardButton}>
                        <Box>INSERT VOLUNTEER</Box>
                    </Box>

                    <hr />

                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                </Box>
                
                <Box className={classes.projectCard} mt="8px" mb="16px">
                    <Typography variant="h6" mb="16px">Project Name</Typography>

                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                </Box>
                
                <Box className={classes.projectCard} mt="8px" mb="16px">
                    <Typography variant="h6" mb="16px">Project Name</Typography>

                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                </Box>
                
                <Box className={classes.projectCard} mt="8px" mb="16px">
                    <Typography variant="h6" mb="16px">Project Name</Typography>

                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                </Box>
                
                <Box className={classes.projectCard} mt="8px" mb="16px">
                    <Typography variant="h6" mb="16px">Project Name</Typography>

                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                </Box>
                
                <Box className={classes.projectCard} mt="8px" mb="16px">
                    <Typography variant="h6" mb="16px">Project Name</Typography>

                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                </Box>
                
                <Box className={classes.projectCard} mt="8px" mb="16px">
                    <Typography variant="h6" mb="16px">Project Name</Typography>

                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                </Box>
                
                <Box className={classes.projectCard} mt="8px" mb="16px">
                    <Typography variant="h6" mb="16px">Project Name</Typography>

                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                </Box>
                
                <Box className={classes.projectCard} mt="8px" mb="16px">
                    <Typography variant="h6" mb="16px">Project Name</Typography>

                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                </Box>
                
                <Box className={classes.projectCard} mt="8px" mb="16px">
                    <Typography variant="h6" mb="16px">Project Name</Typography>

                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                </Box>
                
                <Box className={classes.projectCard} mt="8px" mb="16px">
                    <Typography variant="h6" mb="16px">Project Name</Typography>

                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                </Box>
                
                <Box className={classes.projectCard} mt="8px" mb="16px">
                    <Typography variant="h6" mb="16px">Project Name</Typography>

                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                    <Box class={classes.volunteerName}>
                        <Box>Volunteer Name</Box>
                    </Box>
                </Box>


            </Grid>
        </Grid>
    </>)
}