import { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';

import BasicInfoForm from '../components/RegisterVolunteer/BasicInfoForm';
import Availability from '../components/RegisterVolunteer/Availability';
import SkillsForm from '../components/RegisterVolunteer/SkillsForm';
import CodeOfConduct from '../components/RegisterVolunteer/CodeOfConduct';
import ThankYouMessage from '../components/RegisterVolunteer/ThankYouMessage';
import ApiError from '../components/ApiError';
import RegFormFooter from '../components/RegisterVolunteer/RegFormFooter';
import { Card } from '../styles/components/Card.style';

import { VolunteerContext } from '../lib/VolunteerProvider';
import useTitle from '../hooks/useTitle';


export default function Register() {
  useTitle('Voma | Register');
  const Volunteer = useContext(VolunteerContext);
  const [canProceed, setCanProceed] = useState(true); // todo: create section-based validity 

  const goBack = () => {
    Volunteer.setRegistrationStep(Volunteer.registrationStep - 1);
  };

  const goForward = () => {
    Volunteer.setRegistrationStep(Volunteer.registrationStep + 1);
  }


  return (<>
    {!Volunteer.isAuthenticated && <Redirect to="/" />}
    {Volunteer.registrationErrorMessage && <ApiError message={Volunteer.registrationErrorMessage} />}
    <Card>
        {Volunteer?.registrationStep === 1 && <BasicInfoForm />}
        {Volunteer?.registrationStep === 2 && <Availability />}
        {Volunteer?.registrationStep === 3 && <SkillsForm />}
        {Volunteer?.registrationStep === 4 && <CodeOfConduct />}
        {Volunteer?.registrationStep === 5 && <ThankYouMessage />}
      <RegFormFooter step={Volunteer.registrationStep} goBack={goBack} goForward={goForward} canProceed />
    </Card>
  </>);
}
