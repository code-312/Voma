import { useState, useEffect } from 'react';
import { Label3, BodyText2 } from '../../styles/components/Typography';
import { CocContainer } from '../../styles/pages/RegisterPage.style';
import StackedInput from '../StackedInputs';
import RequiredLabel from '../RequiredLabel';

export default function CodeOfConduct({ setCanSubmit }) {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    setCanSubmit(accepted);
  }, [accepted, setCanSubmit]);

  return (
    <div>
      <h1>
        Code of Conduct
      </h1>
      <p><span>Please review the code of conduct below.</span></p>

      <RequiredLabel />

      <Label3>
        Code of Conduct
      </Label3>

      <CocContainer>
      <BodyText2>
            Adapted from the{' '}
            <a href="https://github.com/codeforamerica/codeofconduct">
              CfA Code of Conduct
            </a>.

            <p>We are an official brigade. The Code for Chicago community expects that Code for Chicago
            events, and digital forums:</p>


          <p>Are a safe and respectful environment for all participants.</p>
          <p>
            Are a place where people are free to fully express their identities.
          </p>
          <p>
            Presume the value of others. Everyone&apos;s ideas, skills, and contributions have
            value.
          </p>
          <p>
            Don&apos;t assume everyone has the same context, and encourage questions.
          </p>
          <p>
            Find a way for people to be productive with their skills (technical and not) and energy.
            Use language such as “yes/and”, not “no/but.”
          </p>
          <p>
            Encourage members and participants to listen as much as they speak.
          </p>
          <p>
            Strive to build tools that are open and free technology for public use. Activities that
            aim to foster public use, not private gain, are prioritized.
          </p>
          <p>
            Prioritize access for and input from those who are traditionally excluded from the civic
            process.
          </p>
          <p>
            Work to ensure that the community is well-represented in the planning, design, and
            implementation of civic tech. This includes encouraging participation from women,
            minorities, and traditionally marginalized groups.{' '}
          </p>
          <p>
            Actively involve community groups and those with subject matter expertise in the
            decision-making process.
          </p>
          <p>
            Ensure that the relationships and conversations between community members, the local
            government staff and community partners remain respectful, participatory, and
            productive.
          </p>
          <p>
            Provide an environment where people are free from discrimination or harassment.
          </p>

          <p>
            Code for Chicago reserves the right to ask anyone in violation of these policies not to
            participate in Code for Chicago network activities, events, and digital forums.
          </p>
        </BodyText2>
        </CocContainer>
        <Label3>
          Do you agree to our Code of Conduct?
          <span
            style={{
              color: '#a31864',
              display: 'inline',
              marginLeft: '0.3125rem',
              marginTop: '-0.1875rem',
            }}
          >
            *
          </span>
        </Label3>
        <StackedInput
          labelText="I understand and I accept this Code of Conduct"
          value="I understand and I accept this Code of Conduct"
          name="codeOfConduct"
          checked={accepted}
          onChange={() => setAccepted(true)}
          type="radio"
        />
        <StackedInput
          type="radio"
          checked={!accepted}
          onChange={() => setAccepted(false)}
          value="I do not accept this Code of Conduct"
          labelText="No, I don't agree to the Code of Conduct"
        />
    </div>
  );
}
