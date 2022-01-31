import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

export default function Header() {
    return (
        <AppBar position="static" style={{ backgroundColor: '#6200EE' }}>
            <Toolbar>
                <Typography variant="h6" noWrap component="div">Code for Chicago</Typography>
            </Toolbar>
        </AppBar>
    )
}