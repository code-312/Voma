import React from 'react';
import { Link } from 'react-router-dom';
import StyledFieldset from '../components/StyledFieldset';

export default function Profile() {
  const profile = {
    firstName: 'Joseph',
    lastName: 'Tajaran',
    email: 'joseph@tajaran.com',
    pronouns: 'he/him',
    skill: 'UX Design',
  };

  return (
    <StyledFieldset>
      <form>
        <legend>
          {profile.firstName} {profile.lastName}
        </legend>
        <p>
          {' '}
          <Link to="/"> Home</Link> / {profile.firstName} {profile.lastName}{' '}
          <Link to="/signOut" style={{ float: 'right' }}>
            {' '}
            Sign-Out
          </Link>
        </p>

        <legend>Basic Info</legend>

        <p>
          Email
          <h2> {profile.email} </h2>
        </p>

        <p>
          Full Name
          <h2>
            {profile.firstName} {profile.lastName}
          </h2>
        </p>

        <p>
          Pronouns
          <h2>{profile.pronouns}</h2>
        </p>

        <legend>Skills</legend>

        <p>
          Primiary Skills
          <h2>{profile.skill}</h2>
        </p>
      </form>
    </StyledFieldset>
  );
}
