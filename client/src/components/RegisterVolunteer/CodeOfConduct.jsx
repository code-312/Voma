import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { FormControlLabel } from '@mui/material';
import Button from '@mui/material/Button';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import ErrorIcon from '@mui/icons-material/Error';
import Radio from '@mui/material/Radio';
import MUIFieldsetStyles from '../MUIStyledFieldSet';

import { VolunteerContext } from '../../lib/VolunteerProvider';

export default function CodeOfConduct() {
  const [accepted, setAccepted] = useState(false);
  const [unfinished, setUnfinished] = useState(false);

  const Volunteer = useContext(VolunteerContext);

  const completeRegistration = () => {
    if (accepted) {
      Volunteer.registerVolunteer();
      Volunteer.setRegistrationStep(5);
    } else {
      setUnfinished(true);
    }
  }

  return (
    <MUIFieldsetStyles>
      <Typography variant="h1"> Code of Conduct</Typography>
      <Typography>Please review our code of conduct</Typography>
      {unfinished &&
        <Typography variant="div" color="red">
          <ErrorIcon variant="filled" />
          All fields are required{' '}
        </Typography>
      }
      <hr />
      <br />
      <Typography variant="h2">Adapted Code of Conduct</Typography>

      <Typography paragraph>
        Adapted from the{' '}
        <a href="https://github.com/codeforamerica/codeofconduct">CfA Code of Conduct</a>. We are an
        official brigade. <br />
        The Code for Chicago community expects that Code for Chicago events, and digital forums:
      </Typography>
      <List>
        <ListItem>1. Are a safe and respectful environment for all participants.</ListItem>
        <ListItem>2. Are a place where people are free to fully express their identities.</ListItem>
        <ListItem>
          3. Presume the value of others. Everyone&apos;s ideas, skills, and contributions have value.
        </ListItem>
        <ListItem>4. Don’t assume everyone has the same context, and encourage questions.</ListItem>
        <ListItem>
          5. Find a way for people to be productive with their skills (technical and not) and energy.
          Use language such as “yes/and”, not “no/but.”
        </ListItem>
        <ListItem>6. Encourage members and participants to listen as much as they speak.</ListItem>
        <ListItem>
          7. Strive to build tools that are open and free technology for public use. Activities that
          aim to foster public use, not private gain, are prioritized.
        </ListItem>
        <ListItem>
          8. Prioritize access for and input from those who are traditionally excluded from the civic
          process.
        </ListItem>
        <ListItem>
          9. Work to ensure that the community is well-represented in the planning, design, and
          implementation of civic tech. This includes encouraging participation from women,
          minorities, and traditionally marginalized groups.{' '}
        </ListItem>
        <ListItem>
          10. Actively involve community groups and those with subject matter expertise in the
          decision-making process.
        </ListItem>
        <ListItem>
          11. Ensure that the relationships and conversations between community members, the local
          government staff and community partners remain respectful, participatory, and productive.
        </ListItem>
        <ListItem>12. Provide an environment where people are free from discrimination or harassment.</ListItem>
      </List>
      <br />
      <Typography paragraph> Code for Chicago reserves the right to ask anyone in violation of these policies not to
        participate in Code for Chicago network activities, events, and digital forums.</Typography>
      <hr />

      <Typography paragraph>Have you read this?</Typography>

      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
          <FormControlLabel
          htmlFor="COC"
          type="radio"
          onChange={() => setAccepted(true)}
          id="COC"
          value="I understand and I accept
        this Privacy Policy"
          label="I understand and I accept
        this Privacy Policy"
          control={<Radio />}
          />
      </RadioGroup>

      <Typography variant="button">
         <Button onClick={() => Volunteer.setRegistrationStep(3)} variant="contained">
          Back
        </Button>
         <Button disabled={!accepted} onClick={completeRegistration}  variant="contained">
          Next
        </Button>
        </Typography>
    </MUIFieldsetStyles>
  );
}
