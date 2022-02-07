import { useState } from 'react';
import PropTypes from 'prop-types';
import StyledFieldset from './StyledFieldset';

export default function CodeOfConduct({ setRegisterStep, saveUser }) {
  const [accepted, setAccepted] = useState(false);

  return (
    <StyledFieldset>
      <legend>Privacy Policy</legend>
      <p className="instructions">Review our Privacy Policy</p>
      <p>Please review our Privacy Policy</p>
      <hr />
      <br />
      <p>Code for Chicago&apos;s Code of Conduct</p>
      <p>
        Adapted from the{' '}
        <a href="https://github.com/codeforamerica/codeofconduct">CfA Code of Conduct</a>. We are an
        official brigade. <br />
        The Code for Chicago community expects that Code for Chicago events, and digital forums:
      </p>
      <ol>
        <li>Are a safe and respectful environment for all participants.</li>
        <li>Are a place where people are free to fully express their identities.</li>
        <li>
          Presume the value of others. Everyone&apos;s ideas, skills, and contributions have value.
        </li>
        <li>Don’t assume everyone has the same context, and encourage questions.</li>
        <li>
          Find a way for people to be productive with their skills (technical and not) and energy.
          Use language such as “yes/and”, not “no/but.”
        </li>
        <li>Encourage members and participants to listen as much as they speak.</li>
        <li>
          Strive to build tools that are open and free technology for public use. Activities that
          aim to foster public use, not private gain, are prioritized.
        </li>
        <li>
          Prioritize access for and input from those who are traditionally excluded from the civic
          process.
        </li>
        <li>
          Work to ensure that the community is well-represented in the planning, design, and
          implementation of civic tech. This includes encouraging participation from women,
          minorities, and traditionally marginalized groups.{' '}
        </li>
        <li>
          Actively involve community groups and those with subject matter expertise in the
          decision-making process.
        </li>
        <li>
          Ensure that the relationships and conversations between community members, the local
          government staff and community partners remain respectful, participatory, and productive.
        </li>
        <li>Provide an environment where people are free from discrimination or harassment.</li>
      </ol>
      <br />
      <p>
        Code for Chicago reserves the right to ask anyone in violation of these policies not to
        participate in Code for Chicago network activities, events, and digital forums.
      </p>
      <hr />
      <p className="instructions">Have you read this?</p>
      <label className="skillLabel" htmlFor="COC">
        <input type="radio" id="COC" onChange={() => setAccepted(true)} />I understand and I accept
        this Privacy Policy.
      </label>
      <nav>
        <button onClick={() => setRegisterStep(4)} type="button">
          Back
        </button>
        <button disabled={!accepted} onClick={(e) => saveUser(e)} type="submit">
          Submit
        </button>
      </nav>
    </StyledFieldset>
  );
}

CodeOfConduct.propTypes = {
  setRegisterStep: PropTypes.func.isRequired,
  saveUser: PropTypes.func
};

CodeOfConduct.defaultProps = {
  saveUser: () => {
    console.log("default function")
  }
}
