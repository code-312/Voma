import React, { useState, useEffect } from 'react';
import { StyledInput } from '../../../../styles/components/Input.style';

const ActivityInput = ({ initialValue, storeNewValue, id, isNew, disabled }) => {
    const [value, setValue] = useState("");

    const setNewValue = (e) => {
        const name = e.currentTarget.value;
        const eventId = e.currentTarget.id;

        setValue(name);
        storeNewValue(parseInt(eventId, 10), name, isNew);
    }

    useEffect(() => {
        if (initialValue) {
            setValue(initialValue);
        }
    }, [initialValue]);

    return (
        <StyledInput
            type='text'
            value={value}
            id={id}
            isNew={isNew}
            placeholder="Add New Acitivity"
            onChange={setNewValue}
            disabled={disabled}
        />
    )
};

export default ActivityInput;
