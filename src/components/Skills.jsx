import React from 'react';

// eslint-disable-next-line react/prop-types
export default function Skills({StyledFieldset, skills, handleFormChange, setRegisterStep}) {
  return(
    <StyledFieldset>
      <legend>Skills</legend>
      <p>Input basic info about yourself.</p>
      <p>*Fields are required</p>
      <label htmlFor="skills">Pick your primary skill
        <p>Select the skill you will practice the most at Code for Chicago. You don&apos;t have to be an expert in this skill.</p>
        <input id="pronouns" type="text" onChange={handleFormChange} name="skill" value={skills} />
      </label>
      <button onClick={()=> setRegisterStep(1)} type="button">Previous</button>
      <button onClick={()=> setRegisterStep(3)} type="button">Next</button>
    </StyledFieldset>
  )
}
