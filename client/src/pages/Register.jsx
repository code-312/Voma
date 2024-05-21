import { useContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import BasicInfoForm from '../components/RegisterVolunteer/BasicInfoForm';
import Availability from '../components/RegisterVolunteer/Availability';
import SkillsForm from '../components/RegisterVolunteer/SkillsForm';
import BackgroundForm from '../components/RegisterVolunteer/BackgroundForm';
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
  const [canProceed, setCanProceed] = useState(false); 
  const [canSubmit, setCanSubmit] = useState(false);
  
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
  }

  const saveVolunteer = () => {
    Volunteer.updateInfo({
      ...volunteerCopy
    });
  }

  const updateVolunteerArray = (name, value) => {
    const copyCopy = {...volunteerCopy};
    copyCopy[name] = value;
    setVolunteerCopy(copyCopy);
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
                                                jobTitle={volunteerCopy.jobTitle}
                                                employer={volunteerCopy.employer}
                                                student={volunteerCopy.student}
                                                setCanProceed={setCanProceed}
                                              />}
        {Volunteer?.registrationStep === 2 && <Availability 
                                                timeslots={volunteerCopy.timeslots || []} 
                                                updateInfo={updateInfo} 
                                                setCanProceed={setCanProceed}
                                                />}
        {Volunteer?.registrationStep === 3 && <SkillsForm 
                                                volunteer={volunteerCopy} 
                                                updateInfo={updateInfo}
                                                updateVolunteerArray={updateVolunteerArray}
                                                setCanProceed={setCanProceed}
                                              />}
        {Volunteer?.registrationStep === 4 && <BackgroundForm 
                                                volunteer={volunteerCopy}
                                                updateInfo={updateInfo}
                                                updateVolunteerArray={updateVolunteerArray}
                                                setCanProceed={setCanProceed}
                                              />}
        {Volunteer?.registrationStep === 5 && <CodeOfConduct setCanSubmit={setCanSubmit} />}
        {Volunteer?.registrationStep === 6 && <ThankYouMessage />}
      <RegFormFooter 
        step={Volunteer.registrationStep} 
        goBack={goBack} 
        goForward={goForward} 
        canProceed={canProceed} 
        canSubmit={canSubmit}
      />
    </Card>
  </>);
}
