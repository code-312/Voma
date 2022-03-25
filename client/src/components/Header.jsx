import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

export default function Header() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>Code for Chicago</Typography>
                    <Button color="inherit">Sign In</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}