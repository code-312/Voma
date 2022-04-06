import { useState, useEffect } from 'react';
import { Box, Alert } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    Alert: {
        '& .MuiPaper-root': {
            position: 'fixed',
            top: 0,
            right: 0,
            zIndex: 100,
            width: '100%',
            justifyContent: 'center',
        }
    }
});

export default function ApiError({ message }) {
    const [show, setShow] = useState(true);

    const classes = useStyles();

    useEffect(() => {
        const autoDismiss = setTimeout(() => {
            setShow(false);
        }, 4000);

        return () => {
            clearTimeout(autoDismiss);
        };
    });

    if (!show) return null;

    return (<>
        <Box className={classes.Alert}>
            <Alert severity="warning"><span dangerouslySetInnerHTML={{ __html: message }} /></Alert>
        </Box>
    </>);
}