import { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import HasOnboardedForm from '../components/RegisterVolunteer/HasOnboardedForm';
import NeedsOnboardingMessage from '../components/RegisterVolunteer/NeedsOnboardingMessage';
import BasicInfoForm from '../components/RegisterVolunteer/BasicInfoForm';
import SkillsForm from '../components/RegisterVolunteer/SkillsForm';
import CodeOfConduct from '../components/RegisterVolunteer/CodeOfConduct';
import ThankYouMessage from '../components/RegisterVolunteer/ThankYouMessage';

import { VolunteerContext } from '../lib/VolunteerProvider';

export default function Register() {
  const Volunteer = useContext(VolunteerContext);

  return (<>
    {!Volunteer.isAuthenticated && <Redirect to="/" />}
    <form>
      {Volunteer?.registrationStep === 1 && <HasOnboardedForm />}
      {Volunteer?.registrationStep === 0 && <NeedsOnboardingMessage />}
      {Volunteer?.registrationStep === 2 && <BasicInfoForm />}
      {Volunteer?.registrationStep === 3 && <SkillsForm />}
      {Volunteer?.registrationStep === 4 && <CodeOfConduct />}
      {Volunteer?.registrationStep === 5 && <ThankYouMessage />}
    </form>
  </>);
}
