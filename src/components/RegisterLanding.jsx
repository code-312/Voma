import React, { useState } from 'react';
import PropTypes from 'prop-types';
import NoOnboarding from '../pages/NoOnboarding';
import StyledFieldset from './StyledFieldset';

export default function RegisterLanding({ setRegisterStep }) {
  const [isRegistered, setIsRegistered] = useState(null);

  const handleRadioChoice = (e) => {
    if (e.target.value === 'yes') {
      setIsRegistered(true);
    } else if (e.target.value === 'no') {
      setIsRegistered(false);
    } 
  };

  return (
    <>
      <StyledFieldset>
        <h1 className="registerh1">Volunteer with us at Code for Chicago!</h1>

        <div className="registerd1">
          <p>
            As part of the Code for America brigade network, Code for Chicago connects skills-based
            volunteers to Chicago-based nonprofits, mutual aid groups, and people with ideas on how
            they can improve their community.
          </p>
          <p className="registerp2">
            This contact form is for people who have completed our Onboarding Night and are
            interested in participating in Code for Chicago projects and committees. We created this
            formal process to cut down on the onboarding time. Our hope is to assign you to a
            project or committee within a week of your submission. If you don&apos;t fit a project
            need or none of the projects interest you then we will put you on a waiting list and
            reach out when new projects come up.
          </p>
        </div>

        <hr />

        <h2 className="registerh2">Have you registered and attended Onboarding Night?</h2>
        <label className="statusLabel" htmlFor="radio1">
          <input
            type="radio"
            name="status"
            id="radio1"
            value="yes"
            onChange={(e) => handleRadioChoice(e)}
          />
          Yes
        </label>
        <label className="statusLabel" htmlFor="radio2">
          <input
            type="radio"
            name="status"
            id="radio2"
            value="no"
            onChange={(e) => handleRadioChoice(e)}
          />
          No
        </label>
        <nav>
          <button
            className="registerb1"
            type="button"
            onClick={isRegistered ? () => setRegisterStep(2) : () => setIsRegistered('not')}
            disabled={isRegistered === null}
          >
            Next
          </button>
        </nav>

        {isRegistered === 'not' && <NoOnboarding />}
      </StyledFieldset>
    </>
  );
}

RegisterLanding.propTypes = {
  setRegisterStep: PropTypes.func.isRequired,
}