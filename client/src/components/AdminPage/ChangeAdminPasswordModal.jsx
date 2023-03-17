import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { AdminModalContainer } from '../../styles/components/AdminModal.style';

const ChangeAdminPasswordModal = ({open, handleClose, sendChangePassword}) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');

    const updateCurrentPassword = (e) => {
        setCurrentPassword(e.currentTarget.value);
    }

    const updateNewPassword = (e) => {
        setNewPassword(e.currentTarget.value);
    }

    const updateVerifyPassword = (e) => {
        setVerifyPassword(e.currentTarget.value);
    }

    const changeAdminPassword = () => {
        sendChangePassword(currentPassword, newPassword);
    }

    return (
        <Modal
            open={open}
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
    )
};

export default ChangeAdminPasswordModal;
