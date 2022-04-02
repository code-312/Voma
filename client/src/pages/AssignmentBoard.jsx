import { useContext } from 'react';
import { Grid, Box, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { AuthContext } from '../lib/AuthProvider';

const useStyles = makeStyles({
    sidebar: {
        overflowY: 'scroll',
        paddingLeft: '16px',
        paddingRight: '24px',
        minHeight: 'calc(100vh - 64px)',
        maxHeight: 'calc(100vh - 64px)',
        marginTop: '-32px',
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
        
    },
    board: {
        overflowX: 'scroll',
        marginTop: '-32px',
        width: 'calc(100vw - 272px)',
        maxWidth: 'calc(100vw - 272px)',
        '& > .MuiBox-root': {
            marginLeft: '9px',
        },
        '& > .MuiBox-root ~ .MuiBox-root': {

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

    }
})

export default function AssignmentBoard() {
    const UserAuth = useContext(AuthContext);

    const classes = useStyles();

    return (<>
        <Grid container justifyContent="flex-box">
            <Grid item md={2} className={classes.sidebar}>
                <Typography variant="h6" mt="24px" mb="16px">Currently Onboarding</Typography>

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
                <Box class={classes.volunteerName}>
                    <Box>Volunteer Name</Box>
                </Box>
            </Grid>
            
            <Grid item md={10} className={classes.board} sx={{ whiteSpace: 'nowrap' }}>

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