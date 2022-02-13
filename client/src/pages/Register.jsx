/* eslint-disable import/prefer-default-export */
import { useState } from 'react';
import BasicInfo from '../components/BasicInfo';
import Skills from '../components/Skills';
import CodeOfConduct from '../components/CodeOfConduct';
import PrivacyPolicy from '../components/PrivacyPolicy';
import NoOnboarding from './NoOnboarding';
import RegisterLanding from '../components/RegisterLanding';
import { User } from '../models/user.model';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    pronouns: '',
    skill: ''
  });

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [registerStep, setRegisterStep] = useState(1);

  const saveUser = (e) => {
    e.preventDefault()

    const name = `${formData.firstName} ${formData.lastName}`;
    const user = new User(name, "user@email.com", "slackID", formData.pronouns);
    fetch('/api/volunteer', {
      method: 'POST',
      body: JSON.stringify({
        "name": user.name,
        "email": user.email,
        "pronouns": user.pronouns,
        "slackUserId": user.slackUserId
      }),
      headers: { 'Content-Type': 'application/json' }
    })
        .then((res) => {
          if (res.status === 404) {
            throw new Error();
          } else {
            // Redirect??
            return res.json();
          }
        })
        .catch((err) => {
          console.log(err);
        });
  }

  return (
    <form>
      {registerStep === 0 && <NoOnboarding />}
      {registerStep === 1 && <RegisterLanding setRegisterStep={setRegisterStep} />}
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
      {registerStep === 5 && <PrivacyPolicy setRegisterStep={setRegisterStep} saveUser={saveUser} />}
    </form>
  );
}
