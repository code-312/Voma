import React from 'react';
import PropTypes from 'prop-types';
import StyledFieldset from './StyledFieldset';

export default function Skills({ skills, handleFormChange, setRegisterStep }) {
  const skillList = [
    'Data Analytics',
    'Data Science',
    'Machine Learning',
    'Front-End',
    'Back-End',
    'Content Strategy',
    'UX Research',
    'UX Design',
    'UI Design',
    'Visual Design',
    'Product Management',
    'Project Management',
  ];

  const toCamelCase = (str) =>
    str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase(),
      )
      .replace(/\s+/g, '');

  return (
    <StyledFieldset>
      <legend>Skills</legend>
      <p className="instructions">Pick your primary skill</p>
      <p>
        Select the skill you will practice the most at Code for Chicago. You don&apos;t have to be
        an expert in this skill.
      </p>

      {skillList.map((skill) => (
        <label className="skillLabel" htmlFor={toCamelCase(skill)} key={skill}>
          <input
            type="radio"
            name="skill"
            id={toCamelCase(skill)}
            value={skill}
            checked={skill === skills}
            onChange={handleFormChange}
          />
          {skill}
        </label>
      ))}

      <nav>
        <button onClick={() => setRegisterStep(1)} type="button">
          Back
        </button>
        <button onClick={() => setRegisterStep(3)} type="button">
          Next
        </button>
      </nav>
    </StyledFieldset>
  );
}
Skills.propTypes = {
  skills: PropTypes.string.isRequired,
  setRegisterStep: PropTypes.func.isRequired,
  handleFormChange: PropTypes.func.isRequired,
};