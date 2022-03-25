import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BasicInfo from '../components/BasicInfo';
import Skills from '../components/Skills';
import CodeOfConduct from '../components/CodeOfConduct';
import ThankYou from '../components/ThankYou';
import NoOnboarding from './NoOnboarding';
import RegisterLanding from '../components/RegisterLanding';
import { User } from '../models/user.model';

export default function Register({ userDetails = null }) {
  const [formData, setFormData] = useState({
    emailAddress: '',
    slackId: '',
    fullName: '',
    pronouns: '',
    skill: '',
  });

  const saveUser = () => {
    // e.preventDefault()

    const user = new User(formData.fullName, formData.emailAddress, formData.slackId, formData.pronouns);
    fetch('/api/volunteer', {
      method: 'POST',
      body: JSON.stringify({
        "name": user.name,
        "email": user.email,
        "pronouns": user.pronouns,
        "slackUserId": user.slackUserId,
        "skill": formData.skill,
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

  useEffect(() => {
    if (userDetails) {
      const { slackId } = userDetails;
      const newFormData = { ...formData };
      newFormData.slackId = slackId || '';

      setFormData(newFormData);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails])

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
          skill={formData.skill}
          setRegisterStep={setRegisterStep}
          handleFormChange={handleFormChange}

        />
      )}
      {registerStep === 4 && <CodeOfConduct setRegisterStep={setRegisterStep} saveUser={saveUser} />}
      {registerStep === 5 && <ThankYou setRegisterStep={setRegisterStep} />}
    </form>
  );
}

Register.defaultProps = {
  userDetails: null
}

Register.propTypes = {
  userDetails: PropTypes.shape({ 
    slackId: PropTypes.string }),
};