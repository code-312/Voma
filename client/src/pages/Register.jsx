import { useState } from 'react';
import BasicInfo from '../components/BasicInfo';
import Skills from '../components/Skills';
import CodeOfConduct from '../components/CodeOfConduct';
import ThankYou from '../components/ThankYou';
import NoOnboarding from './NoOnboarding';
import RegisterLanding from '../components/RegisterLanding';

export default function Register() {
  const [formData, setFormData] = useState({
    emailAddress: '',
    fullName: '',
    pronouns: '',
    skill: '',
  });

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [registerStep, setRegisterStep] = useState(1);

  return (
    <form>
      {registerStep === 0 && <NoOnboarding />}
      {registerStep === 1 && <RegisterLanding setRegisterStep={setRegisterStep} />}
      {registerStep === 2 && (
        <BasicInfo
          emailAddress={formData.emailAddress}
          fullName={formData.fullName}
          pronouns={formData.pronouns}
          setRegisterStep={setRegisterStep}
          handleFormChange={handleFormChange}
        />
      )}
      {registerStep === 3 && (
        <Skills
          skills={formData.skill}
          setRegisterStep={setRegisterStep}
          handleFormChange={handleFormChange}

        />
      )}
      {registerStep === 4 && <CodeOfConduct setRegisterStep={setRegisterStep} />}
      {registerStep === 5 && <ThankYou setRegisterStep={setRegisterStep} />}
    </form>
  );
}
