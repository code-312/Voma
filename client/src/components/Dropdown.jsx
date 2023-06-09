import React from 'react';
import { StyledDropdown } from '../styles/components/Dropdown.style'

const Dropdown = ({ isOpen, children }) => {
    const stopProp = (e) => {
        e.stopPropagation();
    }

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

