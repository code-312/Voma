import React from 'react';
import { ModalBackdrop, ModalBody } from '../styles/components/Modal.style';

const Modal = ({ isOpen, closeFn }) => {
    if (!isOpen) {
        return null;
    }
    return (
        <ModalBackdrop>
            <ModalBody>
                <h2>Test</h2>
            </ModalBody>
        </ModalBackdrop>
    )

};

export default Modal;
