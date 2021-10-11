import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledObject = styled.section`
  width: 50vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  h1 {
    padding: 3rem 0 1rem 0;
    font-size: 3rem;
    font-weight: 700;
  }

  h2 {
    padding: 2rem 0 1rem 0;
    font-size: 2rem;
    font-weight: 700;
  }

  h3 {
    font-size: 1.5rem;
  }

  p {
    font-size: 1rem;
  }
`;

export default function Profile() {
  const profile = {
    firstName: 'Joseph',
    lastName: 'Tajaran',
    email: 'joseph@tajaran.com',
    pronouns: 'he/him',
    skill: 'UX Design',
  };

  return (
    <StyledObject>
      <h1>
        {profile.firstName} {profile.lastName}
      </h1>

      <p>
        <Link to="/"> Home</Link> / {profile.firstName} {profile.lastName}{' '}
        <Link to="/signOut" style={{ float: 'right' }}>
          Sign-Out
        </Link>
      </p>

      <h2>Basic Info</h2>

      <p>
        Email
        <h3> {profile.email} </h3>
      </p>

      <p>
        Full Name
        <h3>
          {profile.firstName} {profile.lastName}
        </h3>
      </p>

      <p>
        Pronouns
        <h3>{profile.pronouns}</h3>
      </p>

      <h2>Skills</h2>

      <p>
        Primary Skills
        <h3>{profile.skill}</h3>
      </p>
    </StyledObject>
  );
}
