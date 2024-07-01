import React from 'react';
import { StackedInputContainer } from '../styles/components/StackedInput.style';
import { Label3 } from '../styles/components/Typography';

const StackedInput = ({ labelText, value, onChange, checked, type, name }) => (
  <StackedInputContainer checked={checked}>
    <Label3>
      <input type={type} value={value} checked={checked} onChange={onChange} name={name} />
      {labelText}
    </Label3>
  </StackedInputContainer>
);

export default StackedInput;
