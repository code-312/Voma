import { useState } from 'react';
import BasicInfo from '../components/BasicInfo';
import Skills from '../components/Skills';
import CodeOfConduct from '../components/CodeOfConduct';
import PrivacyPolicy from '../components/PrivacyPolicy';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
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
      {registerStep === 1 && (
        <RegistrationLanding
          setRegisterStep={setRegisterStep}
        />
      )}
      {registerStep === 2 && (
        <BasicInfo
          firstName={formData.firstName}
          lastName={formData.lastName}
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
      {registerStep === 5 && <PrivacyPolicy setRegisterStep={setRegisterStep} />}
    </form>
  );
}
