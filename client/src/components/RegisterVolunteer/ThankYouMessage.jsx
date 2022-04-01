import { Typography, Grid } from '@mui/material';

export default function ThankYouMessage() {
  return (<>
    <Grid container justifyContent="center">
      <Grid item sm={6} xs={12}>
        <Typography variant="h4" component="h1" mb='16px'> Thank You!</Typography>
        <Typography>
          Thanks for taking the time to complete registration. Our onboarding team will reach out to
          you soon through Slack. In the meantime, please introduce yourself in the #intros channel.
        </Typography>
      </Grid>
    </Grid>
  </>);
}
