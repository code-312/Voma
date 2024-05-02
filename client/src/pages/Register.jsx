import { useContext, useState, useEffect } from 'react';
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
  const [volunteerCopy, setVolunteerCopy] = useState({});
  const [canProceed, setCanProceed] = useState(true); // todo: create section-based validity 

  useEffect(() => {
    if (Volunteer) {
      setVolunteerCopy(Volunteer);
    }
  }, [Volunteer]);

  const updateInfo = (newInfo) => {
    setVolunteerCopy({
      ...volunteerCopy,
      ...newInfo
    });
    console.log(volunteerCopy);
  }

  const saveVolunteer = () => {
    Volunteer.updateInfo({
      ...volunteerCopy
    });
  }

  const goBack = () => {
    saveVolunteer();
    Volunteer.setRegistrationStep(Volunteer.registrationStep - 1);
  };

  const goForward = () => {
    saveVolunteer();
    Volunteer.setRegistrationStep(Volunteer.registrationStep + 1);
  }


  return (<>
    {!Volunteer.isAuthenticated && <Redirect to="/" />}
    {Volunteer.registrationErrorMessage && <ApiError message={Volunteer.registrationErrorMessage} />}
    <Card>
        {Volunteer?.registrationStep === 1 && <BasicInfoForm 
                                                updateInfo={updateInfo} 
                                                name={volunteerCopy.name}
                                                email={volunteerCopy.email}
                                                pronouns={volunteerCopy.pronouns}
                                                local={volunteerCopy.local}
                                              />}
        {Volunteer?.registrationStep === 2 && <Availability 
                                                timeslots={volunteerCopy.timeslots} 
                                                updateInfo={updateInfo} 
                                                />}
        {Volunteer?.registrationStep === 3 && <SkillsForm />}
        {Volunteer?.registrationStep === 4 && <CodeOfConduct />}
        {Volunteer?.registrationStep === 5 && <ThankYouMessage />}
      <RegFormFooter step={Volunteer.registrationStep} goBack={goBack} goForward={goForward} canProceed />
    </Card>
  </>);
}
