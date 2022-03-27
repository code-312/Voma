import React, { useState, useContext } from 'react';

import StyledFieldset from '../StyledFieldset';
import { VolunteerContext } from '../../lib/VolunteerProvider';

export default function HasOnboardedForm() {
  const [hasRegistered, setHasRegistered] = useState(null);

  const Volunteer = useContext(VolunteerContext);

  const handleRadioChoice = (e) => {
    setHasRegistered((e.target.value === 'yes'));
  };

  return (<>
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
            onClick={hasRegistered ? () => Volunteer.setRegistrationStep(2) : () => Volunteer.setRegistrationStep(0)}
            disabled={hasRegistered === null}>
            Next
          </button>
        </nav>
      </StyledFieldset>
  </>);
}

