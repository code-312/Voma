/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react';
import { ModalBackdrop, ModalBody, ModalClose } from '../styles/components/Modal.style';
import useEscapeListener from '../hooks/useEscapeListener';

const Modal = (props) => {    
    const closeListener = (e) => {
        const key = e.code;
        if (key === 'Enter') {
            props.closeFn();
        }
    }

    useEffect(() => {
        const body = document.querySelector('body');
        if (props.isOpen) {
            body.style.overflowY = "hidden";
        } else {
            body.style.overflowY = "auto";
        }
    }, [props.isOpen]);

    useEscapeListener(props.closeFn);

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
