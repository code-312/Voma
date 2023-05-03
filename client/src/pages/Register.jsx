import { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import BasicInfoForm from '../components/RegisterVolunteer/BasicInfoForm';
import SkillsForm from '../components/RegisterVolunteer/SkillsForm';
import CodeOfConduct from '../components/RegisterVolunteer/CodeOfConduct';
import ThankYouMessage from '../components/RegisterVolunteer/ThankYouMessage';
import ApiError from '../components/ApiError';

import { VolunteerContext } from '../lib/VolunteerProvider';
import useTitle from '../hooks/useTitle';


export default function Register() {
  useTitle('Voma | Register')
  const Volunteer = useContext(VolunteerContext);

  return (<>
    {!Volunteer.isAuthenticated && <Redirect to="/" />}
    {Volunteer.registrationErrorMessage && <ApiError message={Volunteer.registrationErrorMessage} />}
    <form>
      {Volunteer?.registrationStep === 1 && <BasicInfoForm />}
      {Volunteer?.registrationStep === 2 && <SkillsForm />}
      {Volunteer?.registrationStep === 3 && <CodeOfConduct />}
      {Volunteer?.registrationStep === 4 && <ThankYouMessage />}
    </form>
  </>);
}
