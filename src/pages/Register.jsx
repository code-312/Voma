import { useState } from 'react';
import styled from 'styled-components';
import BasicInfo from '../components/BasicInfo';
import Skills from '../components/Skills';

const StyledFieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  legend {
    font-size: 3rem;
    font-weight: 600;
  }
  p {
    font-size: 1rem;
  }
  .red {
    color: red;
  }
`;

export default function Register() {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    pronouns: '',
    skill: ''
  })

  const handleFormChange = (e)=> {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const [registerStep, setRegisterStep] = useState(1);

  return(
    <form>
      { registerStep === 1 &&
        <BasicInfo
          firstName={formData.name}
          lastName={formData.lastName}
          pronouns={formData.pronouns}
          setRegisterStep={setRegisterStep}
          handleFormChange={handleFormChange}
          StyledFieldset={StyledFieldset}
        />
      }
      { registerStep === 2 &&
        <Skills
          firstName={formData.name}
          lastName={formData.lastName}
          pronouns={formData.pronouns}
          setRegisterStep={setRegisterStep}
          handleFormChange={handleFormChange}
          StyledFieldset={StyledFieldset}
        />
      }

    </form>
  )
}
