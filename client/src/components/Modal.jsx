/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react';
import { ModalBackdrop, ModalBody, ModalClose } from '../styles/components/Modal.style';

const Modal = (props) => {
    const escListener = (e) => {
        const key = e.code;
        if (key === 'Escape') {
            props.closeFn();
        }
    };
    
    const closeListener = (e) => {
        const key = e.code;
        if (key === 'Enter') {
            props.closeFn();
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', escListener);
    }, []);

    useEffect(() => {
        const body = document.querySelector('body');
        if (props.isOpen) {
            body.style.overflowY = "hidden";
        } else {
            body.style.overflowY = "auto";
        }
    }, [props.isOpen])

    if (!props.isOpen) {
        return null;
    }


    return (
        <ModalBackdrop>
            <ModalClose onClick={props.closeFn} tabIndex={0} onKeyPress={closeListener} />
            <ModalBody>
                {props.children}
            </ModalBody>
        </ModalBackdrop>
    )

};

export default Modal;
