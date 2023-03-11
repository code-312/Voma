import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';

export default function AdminViewEdit() {
    const [adminDetails, setAdminDetails] = useState({});

    function getAdminDetails() {
        const admin = localStorage.getItem('auth');
        if (admin) {
            setAdminDetails(JSON.parse(admin));
        }
    };


    useEffect(() => {
        getAdminDetails();
    }, []);


    return (
        <Grid container justifyContent="center" sx={{ m: 2 }}>
            <Card>
                <CardHeader title="Profile Details" />
                <CardContent>
                    <Grid item xs={12}>
                        <Typography gutterBottom>
                            Name: {adminDetails.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography gutterBottom>
                            Email: {adminDetails.email}
                        </Typography>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    )
};
