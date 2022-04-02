import { useState, useContext } from 'react';
import { Box, Grid, List, ListItem, FormControlLabel, Button, RadioGroup, Typography, Radio } from '@mui/material';
import { ReactComponent as ErrorIcon } from '../../assets/Error.svg';

import { VolunteerContext } from '../../lib/VolunteerProvider';

export default function CodeOfConduct() {
  const [accepted, setAccepted] = useState(false);

  const Volunteer = useContext(VolunteerContext);

  const completeRegistration = () => {
    if (accepted) {
      Volunteer.registerVolunteer();
    }
  }

  return (<>
    <Grid container justifyContent="flex-end">
      <Grid item sm={9} xs={10}>
        <Typography variant="h4" component="h1" mb="16px"> Code of Conduct</Typography>
        <Typography mb="16px">Please review the code of conduct below.</Typography>
        <Box mb="32px">
          <ErrorIcon variant="filled" sx={{ display: 'inline-block' }} /> 
          <Typography component="div" color="#B00020" sx={{ display: 'inline-block', marginLeft: '10px', verticalAlign: 'top'}}>All fields are required</Typography>
        </Box>
      </Grid>
    </Grid>
    <Grid container mb="24px">
      <Grid item md={2} xs={1}>&nbsp;</Grid>
      <Grid item md={6} xs={10} sx={{ backgroundColor: 'rgba(98,0,238,0.08)', padding: '24px' }}>
        <Typography variant="h5" mb="16px">Adapted Code of Conduct</Typography>

        <Typography paragraph>
          Adapted from the <a href="https://github.com/codeforamerica/codeofconduct">CfA Code of Conduct</a>. 
        </Typography>
        <Typography paragraph>
          We are an official brigade. The Code for Chicago community expects that Code for Chicago events, 
          and digital forums:
        </Typography>
        <List>
          <ListItem>1. Are a safe and respectful environment for all participants.</ListItem>
          <ListItem>2. Are a place where people are free to fully express their identities.</ListItem>
          <ListItem>
            3. Presume the value of others. Everyone&apos;s ideas, skills, and contributions have value.
          </ListItem>
          <ListItem>4. Don&apos;t assume everyone has the same context, and encourage questions.</ListItem>
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
        <Typography paragraph>
          Code for Chicago reserves the right to ask anyone in violation of these policies not to participate 
          in Code for Chicago network activities, events, and digital forums.  
        </Typography>
      </Grid>
    </Grid>

    <Grid container justifyContent="flex-end" mb="100px">
      <Grid item sm={9} xs={10}>
        <Typography variant="h5" paragraph>Do you agree to our code of conduct?</Typography>

        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          sx={{ marginBottom: '24px' }}
          defaultValue="female"
          name="radio-buttons-group">
            <FormControlLabel
            type="radio"
            onChange={() => setAccepted(true)}
            value="I understand and I accept this Privacy Policy"
            label="I understand and I accept this Privacy Policy"
            control={<Radio />}
            />
        </RadioGroup>

        <Typography variant="button">
          <Button 
            onClick={() => Volunteer.setRegistrationStep(3)} 
            size="medium" 
            sx={{ marginRight: '16px' }}
            variant="contained">
            Back
          </Button>
          <Button 
            disabled={!accepted} 
            onClick={completeRegistration}  
            variant="contained">
            Next
          </Button>
        </Typography>
      </Grid>
    </Grid>
  </>);
}
