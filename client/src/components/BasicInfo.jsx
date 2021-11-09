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
  const filledOut = firstName !== '' && lastName !== '' && pronouns !== '' && true;
  return (
    <StyledFieldset>
      <legend>Basic Info</legend>
      <p>Input basic info about yourself.</p>
      <label htmlFor="firstName">
        First Name{' '}
        <span className="warning">
          (required)
        </span>
        <input
          id="firstName"
          type="text"
          name="firstName"
          onChange={handleFormChange}
          value={firstName}
          required
        />
      </label>
      <label htmlFor="lastName">
        Last Name{' '}
        <span className="warning">
          (required)
        </span>
        <input
          id="lastName"
          type="text"
          name="lastName"
          onChange={handleFormChange}
          value={lastName}
          required
        />
      </label>
      <label htmlFor="pronouns">
        Pronouns{' '}
        <span className="warning">
          (required)
        </span>
        <input
          id="pronouns"
          type="text"
          name="pronouns"
          onChange={handleFormChange}
          value={pronouns}
          required
        />
      </label>
      <nav>
        <button
          onClick={filledOut ? () => setRegisterStep(2) : null}
          disabled={!filledOut}
          type="button"
        >
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
