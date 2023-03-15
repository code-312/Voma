import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { AdminModalContainer } from '../../styles/components/AdminModal.style';


const AddAdminModal = ({ open, handleClose, sendAddNewAdmin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');

    const updateName = (e) => {
        setName(e.currentTarget.value);
    }

    const updateEmail = (e) => {
        setEmail(e.currentTarget.value);
    }

    const updatePassword = (e) => {
        setPassword(e.currentTarget.value);
    }

    const updateVerifyPassword = (e) => {
        setVerifyPassword(e.currentTarget.value);
    }

    const addNewAdmin = () => {
        sendAddNewAdmin(name, password, email);
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <AdminModalContainer>
                <Input type="text" placeholder="Name" onChange={updateName} />
                <Input type="text" placeholder="Email" onChange={updateEmail} />
                <Input type="password" placeholder="Password" onChange={updatePassword} />
                <Input type="password" placeholder="Re-Type Password" onChange={updateVerifyPassword} />
                <Button onClick={addNewAdmin} disabled={!password || !verifyPassword || verifyPassword !== password} altText="Passwords must match">
                    Add New Admin
                </Button>
            </AdminModalContainer>
        </Modal>            
    )
};

export default AddAdminModal;
