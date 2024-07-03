import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { editAdmin, changePassword, addAdmin } from '../lib/Requests';
import AdminDetails from '../components/AdminPage/AdminDetails';
import ChangeAdminPasswordModal from '../components/AdminPage/ChangeAdminPasswordModal';
import AddAdminModal from '../components/AdminPage/AddAdminModal';
import useTitle from '../hooks/useTitle';

export default function Admin() {
  useTitle('Voma | Admin');
  const [adminDetails, setAdminDetails] = useState({});
  const [updateStatus, setUpdateStatus] = useState('');
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [newAdminModalOpen, setNewAdminModalOpen] = useState(false);

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

  const setAdminDetailsLS = (name, email) => {
    const admin = JSON.parse(localStorage.getItem('auth'));

    admin.name = name;
    admin.email = email;

    localStorage.setItem('auth', JSON.stringify(admin));
    getAdminDetails();
  };

  const editAdminDetails = async (name, email) => {
    setUpdateStatus('sending');
    const result = await editAdmin(adminDetails.id, name, email);
    if (!result) {
      console.log('error');
      setUpdateStatus('error');
    } else {
      setAdminDetailsLS(name, email);
      setUpdateStatus('success');
    }
  };

  const changeAdminPassword = async (currentPassword, newPassword) => {
    const result = await changePassword(adminDetails.id, currentPassword, newPassword);
    if (!result) {
      console.log('error');
    } else {
      handleClose();
    }
  };

  const addNewAdmin = async (name, password, email) => {
    const result = await addAdmin(name, password, email);
    if (!result) {
      console.log('error');
    } else {
      console.log('Success!');
      handleNewAdminClose();
    }
  };

  useEffect(() => {
    getAdminDetails();
  }, []);

  return (
    <>
      <ChangeAdminPasswordModal
        open={passwordModalOpen}
        handleClose={handleClose}
        sendChangePassword={changeAdminPassword}
      />
      <AddAdminModal
        open={newAdminModalOpen}
        handleClose={handleNewAdminClose}
        sendAddNewAdmin={addNewAdmin}
      />
      <Grid container justifyContent="center" sx={{ m: 2 }}>
        <AdminDetails
          adminDetails={adminDetails}
          updateAdminDetails={editAdminDetails}
          openPasswordModal={handleOpen}
          openNewAdminModal={handleNewAdminOpen}
          updateStatus={updateStatus}
        />
      </Grid>
    </>
  );
}
