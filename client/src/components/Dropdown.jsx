import React, { useEffect } from 'react';
import { StyledDropdown } from '../styles/components/Dropdown.style'

const Dropdown = ({ isOpen, closeFn, children }) => {
    const closeDropdownIfOpen = (e) => {
        console.log("closing?");
        if (isOpen) {
            console.log("Is open?");
            closeFn();
        }
    }
    const escListener = (e) => {
        const key = e.code;
        if (key === 'Escape') {
            closeDropdownIfOpen();
        }
    };

    const stopProp = (e) => {
        e.stopPropagation();
    }


    useEffect(() => {
        document.addEventListener('keydown', escListener);
        document.addEventListener('click', closeDropdownIfOpen);
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    return (
        <StyledDropdown onClick={stopProp}>
            {children}
        </StyledDropdown>
    )
};

export default Dropdown;

