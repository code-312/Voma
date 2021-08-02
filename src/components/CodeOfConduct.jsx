import { useState } from 'react';
import PropTypes from 'prop-types';
import StyledFieldset from './StyledFieldset';

export default function CodeOfConduct({ setRegisterStep }) {
  const [accepted, setAccepted] = useState(false);

  return (
    <StyledFieldset>
      <legend>Code of Conduct</legend>
      <p className="instructions">Review our code of conduct</p>
      <p>Please review the code of conduct</p>
      <hr />
      <br />
      <p>Code for Chicago&apos;s Code of Conduct</p>
      <p>
        Adapted from the{' '}
        <a href="https://github.com/codeforamerica/codeofconduct">CfA Code of Conduct</a>. We are an
        official brigade. <br />
        The Code for Chicago community expects that Code for Chicago events, and digital forums:
      </p>
      <p>
        1. Are a safe and respectful environment for all participants. <br />
        2. Are a place where people are free to fully express their identities. <br />
        3. Presume the value of others. Everyone&apos;s ideas, skills, and contributions have value.{' '}
        <br />
        4. Don’t assume everyone has the same context, and encourage questions. <br />
        5. Find a way for people to be productive with their skills (technical and not) and energy.
        Use language such as “yes/and”, not “no/but.” <br />
        6. Encourage members and participants to listen as much as they speak. <br />
        7. Strive to build tools that are open and free technology for public use. Activities that
        aim to foster public use, not private gain, are prioritized. <br />
        8. Prioritize access for and input from those who are traditionally excluded from the civic
        process. <br />
        9. Work to ensure that the community is well-represented in the planning, design, and
        implementation of civic tech. This includes encouraging participation from women,
        minorities, and traditionally marginalized groups. <br />
        10. Actively involve community groups and those with subject matter expertise in the
        decision-making process. <br />
        11. Ensure that the relationships and conversations between community members, the local
        government staff and community partners remain respectful, participatory, and productive.{' '}
        <br />
        12. Provide an environment where people are free from discrimination or harassment. <br />
      </p>
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
        <button onClick={() => setRegisterStep(1)} type="button">
          Back
        </button>
        <button disabled={!accepted} onClick={() => setRegisterStep(4)} type="button">
          Next
        </button>
      </nav>
    </StyledFieldset>
  );
}

CodeOfConduct.propTypes = {
  setRegisterStep: PropTypes.func.isRequired,
};
