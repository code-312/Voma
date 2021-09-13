import React from 'react';
import { Link } from 'react-router-dom';
import StyledFieldset from '../components/StyledFieldset'

export default function Profile() {
  
  const profile = {
    firstName: 'Joseph',
    lastName: 'Tajaran',
    email: 'joseph@tajaran.com',
    pronouns: 'he/him',
    skill: 'UX Design',

  }

  return(
    <StyledFieldset>
    <form>
      <legend>{profile.firstName} {profile.lastName}</legend>
      <p>  <Link to="/"> Home</Link>  /  {profile.firstName} {profile.lastName} <Link to="/signOut" style={{float: 'right'}}> Sign Out</Link></p>

       <legend>Basic Info</legend>
       
        <p>Email<br/>
        {profile.email}</p>

        <p>Full Name<br/>
        {profile.firstName} {profile.lastName}</p>

        <p>Pronouns<br/>
        {profile.pronouns}</p>
  
       <legend>Skills</legend>

        <p>Primiary Skills<br/>
        {profile.skill}</p>

      </form>

      </StyledFieldset>

  )

}
