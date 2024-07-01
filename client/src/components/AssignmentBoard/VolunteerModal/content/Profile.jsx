/* eslint-disable eqeqeq */
import React from 'react';
import RequiredLabel from '../../../RequiredLabel';
import StackedInput from '../../../StackedInputs';
import { BodyText2, BodySubText, Label3 } from '../../../../styles/components/Typography';
import { ProfileInfoContainer } from '../../../../styles/components/VolunteerModal.style';
import { StyledInput } from '../../../../styles/components/Input.style';

const Profile = ({ volunteer, isEditing, updateVolunteerCopy }) => {
  const updateVolRadio = (e) => {
    // it really likes to pass its values as a string, so we have to get the boolean values
    let value;
    if (e.currentTarget.value === 'true') {
      value = true;
    } else {
      value = false;
    }
    // Then we have to pass it this mock event object... probably a good idea to refactor
    updateVolunteerCopy({ currentTarget: { name: e.currentTarget.name, value } });
  };

  return (
    <div>
      <h3>Profile</h3>
      <BodySubText>Update this volunteer&apos;s basic info.</BodySubText>
      <RequiredLabel />
      <ProfileInfoContainer>
        {isEditing && (
          <>
            <Label3>Name</Label3>
            <StyledInput
              type="text"
              placeholder="Name"
              name="name"
              onChange={updateVolunteerCopy}
              value={volunteer.name}
            />
          </>
        )}
        <Label3>Slack User ID</Label3>
        {isEditing ? (
          <StyledInput
            type="text"
            placeholder="Slack User Id"
            name="slackUserId"
            onChange={updateVolunteerCopy}
            value={volunteer.slackUserId}
          />
        ) : (
          <BodyText2>{volunteer.slackUserId}</BodyText2>
        )}
      </ProfileInfoContainer>
      <ProfileInfoContainer>
        <Label3>Email Address</Label3>
        {isEditing ? (
          <StyledInput
            type="text"
            placeholder="Email Address"
            name="email"
            onChange={updateVolunteerCopy}
            value={volunteer.email}
          />
        ) : (
          <BodyText2>{volunteer.email}</BodyText2>
        )}
      </ProfileInfoContainer>
      <ProfileInfoContainer>
        <Label3>Pronouns</Label3>
        {isEditing ? (
          <StyledInput
            type="text"
            placeholder="Pronouns"
            name="pronouns"
            onChange={updateVolunteerCopy}
            value={volunteer.pronouns}
          />
        ) : (
          <BodyText2>{volunteer.pronouns}</BodyText2>
        )}
      </ProfileInfoContainer>
      <ProfileInfoContainer>
        <Label3>Is this volunteer local to the Chicagoland area?</Label3>
        {isEditing ? (
          <>
            <StackedInput
              key={`${volunteer.id}-local`}
              labelText="Yes"
              value
              name="local"
              checked={volunteer.local}
              onChange={updateVolRadio}
              type="radio"
            />
            <StackedInput
              key={`${volunteer.id}-not-local`}
              labelText="No"
              value={false}
              name="local"
              checked={!volunteer.local}
              onChange={updateVolRadio}
              type="radio"
            />
          </>
        ) : (
          <BodyText2>{volunteer.local ? 'Yes' : 'No'}</BodyText2>
        )}
      </ProfileInfoContainer>
      <ProfileInfoContainer>
        <Label3>Is this volunteer active?</Label3>
        {isEditing ? (
          <>
            <StackedInput
              key={`${volunteer.id}-active`}
              labelText="Yes"
              value
              name="active"
              checked={volunteer.active}
              onChange={updateVolRadio}
              type="radio"
            />
            <StackedInput
              key={`${volunteer.id}-not-active`}
              labelText="No"
              value={false}
              name="active"
              checked={!volunteer.active}
              onChange={updateVolRadio}
              type="radio"
            />
          </>
        ) : (
          <BodyText2>{volunteer.active ? 'Yes' : 'No'}</BodyText2>
        )}
      </ProfileInfoContainer>
      <ProfileInfoContainer>
        <Label3>Job Opportunities</Label3>
        <BodySubText>Is this volunteer currently searching for job opportunities?</BodySubText>
        {isEditing ? (
          <>
            <StackedInput
              key={`${volunteer.id}-jobTitle-yes`}
              labelText="Yes, I am currently searching for job opportunities"
              value="Yes, I am currently searching for job opportunities"
              name="jobTitle"
              checked={volunteer.jobTitle == 'Yes, I am currently searching for job opportunities'}
              onChange={updateVolunteerCopy}
              type="radio"
            />
            <StackedInput
              key={`${volunteer.id}-jobTitle-soon`}
              labelText="No, but I will be searching for job opportunities within the next 2-12 months."
              value="No, but I will be searching for job opportunities within the next 2-12 months."
              name="jobTitle"
              checked={
                volunteer.jobTitle ==
                'No, but I will be searching for job opportunities within the next 2-12 months.'
              }
              onChange={updateVolunteerCopy}
              type="radio"
            />
            <StackedInput
              key={`${volunteer.id}-jobTitle-no`}
              labelText="No, at this time I am not actively looking for job opportunities now or within the next 2-12 months."
              value="No, at this time I am not actively looking for job opportunities now or within the next 2-12 months."
              name="jobTitle"
              checked={
                volunteer.jobTitle ==
                'No, at this time I am not actively looking for job opportunities now or within the next 2-12 months.'
              }
              onChange={updateVolunteerCopy}
              type="radio"
            />
          </>
        ) : (
          <BodyText2>{volunteer.jobTitle}</BodyText2>
        )}
      </ProfileInfoContainer>
      <ProfileInfoContainer>
        <Label3>Employment Status</Label3>
        {isEditing ? (
          <>
            <StackedInput
              key={`${volunteer.id}-employer-employed`}
              labelText="Employed"
              value="Employed"
              name="employer"
              checked={volunteer.employer == 'Employed'}
              onChange={updateVolunteerCopy}
              type="radio"
            />
            <StackedInput
              key={`${volunteer.id}-employer-unemployed`}
              labelText="Unemployed"
              value="Unemployed"
              name="employer"
              checked={volunteer.employer == 'Unemployed'}
              onChange={updateVolunteerCopy}
              type="radio"
            />
            <StackedInput
              key={`${volunteer.id}-employer-student`}
              labelText="Student"
              value="Student"
              name="employer"
              checked={volunteer.employer == 'Student'}
              onChange={updateVolunteerCopy}
              type="radio"
            />
          </>
        ) : (
          <BodyText2>{volunteer.employer}</BodyText2>
        )}
      </ProfileInfoContainer>
      <ProfileInfoContainer>
        <Label3>Student Status</Label3>
        <BodySubText>
          Is this volunteer currently in a formal education program or have recently graduated
          within the last 12 months?
        </BodySubText>
        {isEditing ? (
          <>
            <StackedInput
              key={`${volunteer.id}-student-yes`}
              labelText="Yes, currently in a program."
              value="Yes, currently in a program."
              name="student"
              checked={volunteer.student == 'Yes, currently in a program.'}
              onChange={updateVolunteerCopy}
              type="radio"
            />
            <StackedInput
              key={`${volunteer.id}-student-grad`}
              labelText="Yes, I graduated within the last 12 months."
              value="Yes, I graduated within the last 12 months."
              name="student"
              checked={volunteer.student == 'Yes, I graduated within the last 12 months.'}
              onChange={updateVolunteerCopy}
              type="radio"
            />
            <StackedInput
              key={`${volunteer.id}-student-no`}
              labelText="No"
              value="No"
              name="student"
              checked={volunteer.student == 'No'}
              onChange={updateVolunteerCopy}
              type="radio"
            />
          </>
        ) : (
          <BodyText2>{volunteer.student}</BodyText2>
        )}
      </ProfileInfoContainer>
    </div>
  );
};

export default Profile;
