import React, { useEffect } from 'react';
import { StyledInput } from '../../styles/components/Input.style';
import StackedInput from '../StackedInputs';
import RequiredLabel from '../RequiredLabel';
import { Label3 } from '../../styles/components/Typography';
import { ProfileInfoContainer } from '../../styles/components/VolunteerModal.style';
import { allValid } from '../../lib/util';

export default function BasicInfoForm({ 
  name, 
  email, 
  pronouns, 
  local, 
  jobTitle,
  employer,
  student,
  updateInfo,
  setCanProceed
}) {

  useEffect(() => {
   setCanProceed(allValid([
    name, 
    email, 
    pronouns, 
    jobTitle,
    employer,
    student
   ])); 
  }, [name, 
    email, 
    pronouns, 
    jobTitle,
    employer,
    student, setCanProceed]
  );
  const handleChange = (e) => {
    updateInfo({[e.target.name]: e.target.value});

  };
 
  const updateLocal = (e) => {
    updateInfo({
      // eslint-disable-next-line eqeqeq
      local: e.target.value == 'true'
    });
  }

  return (
    <div>
      <h1>Basic Info</h1>
      <p>Tell us about yourself.</p>
      <RequiredLabel />
      <ProfileInfoContainer>

      <Label3>Email Address</Label3>
        <StyledInput 
          id="emailAddress"
          name="email"
          onChange={handleChange}
          placeholder="email@domain.com"
          defaultValue={email}
          />
      </ProfileInfoContainer>
      <ProfileInfoContainer>
        <Label3>Name</Label3>
        <StyledInput
          id="fullName"
          type="text"
          name="name"
          onChange={handleChange}
          placeholder="How would you want to be addressed?"
          defaultValue={name}
          />
      </ProfileInfoContainer>
      <ProfileInfoContainer>
        <Label3>Pronouns</Label3>
        <StyledInput
          id="pronouns"
          type="text"
          name="pronouns"
          onChange={handleChange}
          defaultValue={pronouns}
          placeholder="How would you want to be addressed?"
          />
      </ProfileInfoContainer>
      <ProfileInfoContainer>
        <Label3>Are you local to the Chicagoland area?</Label3>
        <StackedInput 
          labelText="Yes"
          value
          onChange={updateLocal}
          checked={local}
          type="radio"
          name="local"
          />
      <StackedInput 
        labelText="No"
        value={false}
        onChange={updateLocal}
        checked={!local}
        type="radio"
        name="local"
        />
      </ProfileInfoContainer>
      <ProfileInfoContainer>
        <Label3>Are you currently searching for job opportunities?</Label3>
        <StackedInput 
            labelText="Yes, I am currently searching for job opportunities"
            value="Yes, I am currently searching for job opportunities"
            name="jobTitle"
            checked={jobTitle === "Yes, I am currently searching for job opportunities"}
            onChange={handleChange}
            type="radio"
            />
        <StackedInput 
            labelText="No, but I will be searching for job opportunities within the next 2-12 months."
            value="No, but I will be searching for job opportunities within the next 2-12 months."
            name="jobTitle"
            checked={jobTitle === "No, but I will be searching for job opportunities within the next 2-12 months."}
            onChange={handleChange}
            type="radio"
        />
        <StackedInput 
            labelText="No, at this time I am not actively looking for job opportunities now or within the next 2-12 months."
            value="No, at this time I am not actively looking for job opportunities now or within the next 2-12 months."
            name="jobTitle"
            checked={jobTitle === "No, at this time I am not actively looking for job opportunities now or within the next 2-12 months."}
            onChange={handleChange}
            type="radio"
        />
      </ProfileInfoContainer>
      <ProfileInfoContainer>
        <Label3>Employment Status</Label3>
        <StackedInput 
            labelText="Employed"
            value="Employed"
            name="employer"
            checked={employer === "Employed"}
            onChange={handleChange}
            type="radio"
            />
        <StackedInput 
            labelText="Unemployed"
            value="Unemployed"
            name="employer"
            checked={employer === "Unemployed"}
            onChange={handleChange}
            type="radio"
            />
        <StackedInput 
            labelText="Student"
            value="Student"
            name="employer"
            checked={employer === "Student"}
            onChange={handleChange}
            type="radio"
            />
      </ProfileInfoContainer>
      <ProfileInfoContainer>
        <Label3>Are you currently in a formal education program or have recently graduated within the last 12 months?</Label3>
        <StackedInput 
            labelText="Yes, currently in a program."
            value="Yes, currently in a program."
            name="student"
            checked={student === "Yes, currently in a program."}
            onChange={handleChange}
            type="radio"
            />
        <StackedInput 
            labelText="Yes, I graduated within the last 12 months."
            value="Yes, I graduated within the last 12 months."
            name="student"
            checked={student === "Yes, I graduated within the last 12 months."}
            onChange={handleChange}
            type="radio"
            />
        <StackedInput 
            labelText="No"
            value="No"
            name="student"
            checked={student === "No"}
            onChange={handleChange}
            type="radio"
            />
        </ProfileInfoContainer>
    </div>
  );
}
