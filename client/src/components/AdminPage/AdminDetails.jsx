import React, { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import { Grid, Typography, Input } from '@mui/material';
import Button from '@mui/material/Button';

const AdminDetails = ({ adminDetails, updateAdminDetails, openPasswordModal, openNewAdminModal, updateStatus }) => {
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const toggleEditName = () => setIsEditingName(!isEditingName);
    const toggleEditEmail = () => setIsEditingEmail(!isEditingEmail);

    const updateName = (e) => {
        setName(e.currentTarget.value);
    }

    const updateEmail = (e) => {
        setEmail(e.currentTarget.value);
    }

    useEffect(() => {
        setName(adminDetails.name);
        setEmail(adminDetails.email);
    }, [adminDetails]);

    useEffect(() => {
        if (updateStatus === 'success') {
            setIsEditingEmail(false);
            setIsEditingName(false);
        }
    }, [updateStatus])

    const editAdminDetails = () => {
        updateAdminDetails(name, email);
    }

    return (
        <Card>
            <CardHeader title="Profile Details" />
            <CardContent>
                <Grid item xs={12}>
                    { isEditingName ? 
                        <div>
                            <Input type="text" placeholder={adminDetails.name} onChange={updateName} />
                            <SaveIcon fontSize="small" sx={{ cursor: 'pointer', ml: 1 }} role="button" tabIndex={0} onClick={editAdminDetails} />
                            <CancelIcon tabIndex={0} fontSize="small" sx={{ cursor: 'pointer', ml:1 }} role="button" onClick={toggleEditName} />
                        </div>
                    :
                        <Typography gutterBottom>
                            Name: {adminDetails.name}
                            <EditIcon fontSize="small" sx={{ cursor: 'pointer', ml:1 }} role="button" tabIndex={0} onClick={toggleEditName} />
                        </Typography>
                    }
                </Grid>
                <Grid item xs={12}>
                    { isEditingEmail ? 
                        <div>
                            <Input type="text" placeholder={adminDetails.email} onChange={updateEmail} />
                            <SaveIcon fontSize="small" sx={{ cursor: 'pointer', ml:1 }} role="button" tabIndex={0} onClick={editAdminDetails} />
                            <CancelIcon fontSize="small" sx={{ cursor: 'pointer', ml:1 }} role="button" tabIndex={0} onClick={toggleEditEmail} />
                        </div>
                    :
                        <Typography gutterBottom>
                            Email: {adminDetails.email}
                            <EditIcon fontSize="small" sx={{ cursor: 'pointer', ml:1 }} role="button" tabIndex={0} onClick={toggleEditEmail} />
                        </Typography>
                    }
                </Grid>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={openPasswordModal}>Change Password</Button>
                <Button size="small" onClick={openNewAdminModal}>Add New Admin</Button>
            </CardActions>
        </Card>
    )
};

export default AdminDetails;
