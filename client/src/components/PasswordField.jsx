import React, { useState } from 'react';
import { EyeOff, Eye } from 'lucide-react';
import { StyledInput, PasswordWrapper } from '../styles/components/Input.style';

const PasswordField = ({ placeholder, onChange }) => {
  const [isShowing, setIsShowing] = useState(false);

  const toggleIsShowing = () => setIsShowing(!isShowing);

  const keyPressListener = (e) => {
    const key = e.code;
    if (key === 'Enter') {
      toggleIsShowing();
    }
  };

  return (
    <PasswordWrapper>
      <StyledInput
        type={isShowing ? 'text' : 'password'}
        placeholder={placeholder}
        onChange={onChange}
      />
      {isShowing ? (
        <Eye onClick={toggleIsShowing} tabIndex={0} onKeyPress={keyPressListener} />
      ) : (
        <EyeOff onClick={toggleIsShowing} tabIndex={0} onKeyPress={keyPressListener} />
      )}
    </PasswordWrapper>
  );
};

export default PasswordField;
