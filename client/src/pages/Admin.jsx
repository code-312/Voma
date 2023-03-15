import React, { useEffect, useState } from 'react';
import { Grid, Typography, Input } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { editAdmin, changePassword, addAdmin } from '../lib/Requests';
import { AdminModalContainer } from '../styles/components/AdminModal.style';


export default function Admin() {
    const [adminDetails, setAdminDetails] = useState({});
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [passwordModalOpen, setPasswordModalOpen] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [newAdminModalOpen, setNewAdminModalOpen] = useState(false);
    const [newAdminName, setNewAdminName] = useState('');
    const [newAdminEmail, setNewAdminEmail] = useState('');
    const [newAdminPassword, setNewAdminPassword] = useState('');
    const [newAdminVerify, setNewAdminVerify] = useState('');

    const handleOpen = () => setPasswordModalOpen(true);
    const handleClose = () => setPasswordModalOpen(false);

    const handleNewAdminOpen = () => setNewAdminModalOpen(true);
    const handleNewAdminClose = () => setNewAdminModalOpen(false);

    const getAdminDetails = () => {
        const admin = localStorage.getItem('auth');
        if (admin) {
            setAdminDetails(JSON.parse(admin));
        }
    };

    const updateNewPassword = (e) => {
        setNewPassword(e.currentTarget.value);
    }

    const updateVerifyPassword = (e) => {
        setVerifyPassword(e.currentTarget.value);
    }

    const updateCurrentPassword = (e) => {
        setCurrentPassword(e.currentTarget.value);
    }

    const updateNewAdminName = (e) => {
        setNewAdminName(e.currentTarget.value);
    }

    const updateNewAdminEmail = (e) => {
        setNewAdminEmail(e.currentTarget.value);
    }

    const updateNewAdminPassword = (e) => {
        setNewAdminPassword(e.currentTarget.value);
    }

    const updateNewAdminVerify = (e) => {
        setNewAdminVerify(e.currentTarget.value);
    }

    

    const setAdminDetailsLS = (name, email) => {
        const admin = JSON.parse(localStorage.getItem('auth'));

        admin.name = name;
        admin.email = email; 

        localStorage.setItem('auth', JSON.stringify(admin));
    }

   const editAdminDetails = async () => {
        const result = await editAdmin(adminDetails.id, adminDetails.name, adminDetails.email);
        if (!result) {
            console.log('error');
        } else {
            setAdminDetailsLS(adminDetails.name, adminDetails.email);
            setIsEditingEmail(false);
            setIsEditingName(false);
        }

   };

   const changeAdminPassword = async () => {
        const result = await changePassword(adminDetails.id, currentPassword, newPassword);
        if (!result) {
            console.log('error');
        } else {
            handleClose();
        }
   }

   const toggleEditName = () => setIsEditingName(!isEditingName);
   const toggleEditEmail = () => setIsEditingEmail(!isEditingEmail);

   const updateName = (e) => {
        const newName = e.currentTarget.value;
        let adminCopy = {...adminDetails};
        adminCopy.name = newName;

        setAdminDetails(adminCopy);
   }

   const updateEmail = (e) => {
        const newEmail = e.currentTarget.value;
        let adminCopy = {...adminDetails};
        adminCopy.email = newEmail;

        setAdminDetails(adminCopy);
    }

    const addNewAdmin = async () => {
        const result = await addAdmin(newAdminName, newAdminPassword, newAdminEmail);
        if (!result) {
            console.log('error');
        } else {
            console.log("Success!");
            handleNewAdminClose();
        }
    }


    useEffect(() => {
        getAdminDetails();
    }, []);

    return (
        <>
            <Modal
                open={passwordModalOpen}
                onClose={handleClose}
            >
                <AdminModalContainer>
                    <Input type="password" placeholder="Current Password" onChange={updateCurrentPassword} />
                    <Input type="password" placeholder="New Password" onChange={updateNewPassword} />
                    <Input type="password" placeholder="Re-type New Password" onChange={updateVerifyPassword} />
                    <Button onClick={changeAdminPassword} disabled={!newPassword || !verifyPassword || newPassword !== verifyPassword} altText="Passwords must match">
                        Change Password
                    </Button>
                </AdminModalContainer>
            </Modal>
            <Modal
                open={newAdminModalOpen}
                onClose={handleNewAdminClose}
            >
                <AdminModalContainer>
                    <Input type="text" placeholder="Name" onChange={updateNewAdminName} />
                    <Input type="text" placeholder="Email" onChange={updateNewAdminEmail} />
                    <Input type="password" placeholder="Password" onChange={updateNewAdminPassword} />
                    <Input type="password" placeholder="Re-Type Password" onChange={updateNewAdminVerify} />
                    <Button onClick={addNewAdmin} disabled={!newAdminPassword || !newAdminVerify || newAdminPassword !== newAdminVerify} altText="Passwords must match">
                        Add New Admin
                    </Button>
                </AdminModalContainer>
            </Modal>            
            <Grid container justifyContent="center" sx={{ m: 2 }}>
                <Card>
                    <CardHeader title="Profile Details" />
                    <CardContent>
                        <Grid item xs={12}>
                            { isEditingName ? 
                                <div>
                                    <Input type="text" placeholder={adminDetails.name} onChange={updateName} />
                                    <SaveIcon fontSize="small" sx={{ cursor: 'pointer', ml: 1 }} role="button" tabIndex={0} className="clickableIcon" onClick={editAdminDetails} />
                                    <CancelIcon tabIndex={0} fontSize="small" sx={{ cursor: 'pointer', ml:1 }} role="button" className="clickableIcon" onClick={toggleEditName} />
                                </div>
                            :
                                <Typography gutterBottom>
                                    Name: {adminDetails.name}
                                    <EditIcon fontSize="small" sx={{ cursor: 'pointer', ml:1 }} role="button" tabIndex={0} className="clickableIcon" onClick={toggleEditName} />
                                </Typography>
                            }
                        </Grid>
                        <Grid item xs={12}>
                            { isEditingEmail ? 
                                <div>
                                    <Input type="text" placeholder={adminDetails.email} onChange={updateEmail} />
                                    <SaveIcon fontSize="small" sx={{ cursor: 'pointer', ml:1 }} role="button" tabIndex={0} className="clickableIcon" onClick={editAdminDetails} />
                                    <CancelIcon fontSize="small" sx={{ cursor: 'pointer', ml:1 }} role="button" tabIndex={0} className="clickableIcon" onClick={toggleEditEmail} />
                                </div>
                            :
                                <Typography gutterBottom>
                                    Email: {adminDetails.email}
                                    <EditIcon fontSize="small" sx={{ cursor: 'pointer', ml:1 }} role="button" tabIndex={0} className="clickableIcon" onClick={toggleEditEmail} />
                                </Typography>
                            }
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={handleOpen}>Change Password</Button>
                        <Button size="small" onClick={handleNewAdminOpen}>Add New Admin</Button>
                    </CardActions>
                </Card>
            </Grid>
        </>
    )
};
