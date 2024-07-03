/* eslint-disable eqeqeq */
import React from 'react';
import { StyledSelect } from '../styles/components/Select.style';

const Select = ({ id, options, currentValue, name, onChange }) => {
  const changeListener = (e) => {
    onChange(id, name, e.currentTarget.value);
  };

  return (
    <StyledSelect id={`${name}-${id}`} onChange={changeListener} value={currentValue}>
      {options.map((option) => (
        <option key={`${name}-${option.value}-${id}`} value={option.value}>
          {option.text}
        </option>
      ))}
    </StyledSelect>
  );
};

export default Select;
