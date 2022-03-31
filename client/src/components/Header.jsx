import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function Header() {
    return (
        <Box mb="32px" sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large" 
                        edge="start" 
                        sx={{ mr: 2 }}
                        color="inherit" 
                        aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>Voma</Typography>
                    <Button color="inherit">Sign In</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}