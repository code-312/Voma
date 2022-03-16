import Typography from '@mui/material/Typography';
import MUIFieldsetStyles from './MUIStyledFieldSet';

export default function ThankYou() {
  return (
    <MUIFieldsetStyles>
      <Typography variant="h4" component="h1"> Thank You!</Typography>
      <Typography paragraph="true">
        Thanks for taking the time to complete registration. Our onboarding team will reach out to
        you soon through Slack. In the meantime, please introduce yourself in the #intros channel.
      </Typography>
    </MUIFieldsetStyles>
  );
}
