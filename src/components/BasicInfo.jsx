import React from 'react';
import PropTypes from 'prop-types';
import StyledFieldset from './StyledFieldset';

export default function BasicInfo({
  firstName,
  lastName,
  pronouns,
  setRegisterStep,
  handleFormChange,
}) {
  return (
    <StyledFieldset>
      <legend>Basic Info</legend>
      <p>Input basic info about yourself.</p>
      <p className="red">*Fields are required</p>
      <label htmlFor="firstName">
        First Name<span className="red">*</span>
        <input
          id="firstName"
          type="text"
          name="firstName"
          onChange={handleFormChange}
          value={firstName}
        />
      </label>
      <label htmlFor="lastName">
        Last Name<span className="red">*</span>
        <input
          id="lastName"
          type="text"
          name="lastName"
          onChange={handleFormChange}
          value={lastName}
        />
      </label>
      <label htmlFor="pronouns">
        Pronouns<span className="red">*</span>
        <input
          id="pronouns"
          type="text"
          name="pronouns"
          onChange={handleFormChange}
          value={pronouns}
        />
      </label>
      <nav>
        <button onClick={() => setRegisterStep(2)} type="button">
          Next
        </button>
      </nav>
    </StyledFieldset>
  );
}
BasicInfo.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  pronouns: PropTypes.string.isRequired,
  setRegisterStep: PropTypes.func.isRequired,
  handleFormChange: PropTypes.func.isRequired,
};
