import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

export default function Header() {
    return (
        <Box mb="32px" sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    {/* Figma notes has the hamburger menu out of scope */}
                    {/* <IconButton
                        size="large" 
                        edge="start" 
                        sx={{ mr: 2 }}
                        color="inherit" 
                        aria-label="menu">
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>Code for Chicago</Typography>
                    <Button color="inherit">Sign In</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}