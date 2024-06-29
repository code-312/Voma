/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react';
import { ModalBackdrop, ModalBody, ModalClose } from '../styles/components/Modal.style';
import useEscapeListener from '../hooks/useEscapeListener';

const Modal = ({ isOpen, closeFn, useCard = false, children }) => {
  const closeListener = (e) => {
    const key = e.code;
    if (key === 'Enter') {
      closeFn();
    }
  };

  useEffect(() => {
    const body = document.querySelector('body');
    if (isOpen) {
      body.style.overflowY = 'hidden';
    } else {
      body.style.overflowY = 'auto';
    }
  }, [isOpen]);

  useEscapeListener(closeFn);

  if (!isOpen) {
    return null;
  }

  return (
    <ModalBackdrop>
      <ModalClose onClick={closeFn} tabIndex={0} onKeyPress={closeListener} />
      {useCard ? <ModalBody>{children}</ModalBody> : <>{children}</>}
    </ModalBackdrop>
  );
};

export default Modal;
