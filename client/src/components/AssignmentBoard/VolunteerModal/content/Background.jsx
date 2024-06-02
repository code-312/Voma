/* eslint-disable eqeqeq */
import React from 'react';
import RequiredLabel from '../../../RequiredLabel';
import ProjectInfoField from '../../../ProjectPage/ProjectInfoField';
import StackedInput from '../../../StackedInputs';
import { BodyText2, BodySubText, Label3 } from '../../../../styles/components/Typography';
import { ProfileInfoContainer } from '../../../../styles/components/VolunteerModal.style';
import { StyledInput } from '../../../../styles/components/Input.style';

const Background = ({
  volunteer,
  isEditing,
  updateVolunteerCopy,
  skills,
  updateVolunteerArray,
}) => {
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

  const arrayListener = (e) => {
    const { name, value, checked } = e.currentTarget;
    const copy = { ...volunteer };
    let arrCopy = [...copy[name]];
    if (checked) {
      arrCopy = [...arrCopy, value];
    } else {
      arrCopy.splice(arrCopy.indexOf(value), 1);
    }

    updateVolunteerArray(name, arrCopy);
  };

  const backendTech = [
    {
      value: 'sql',
      text: 'SQL',
    },
    {
      value: 'python',
      text: 'Python',
    },
    {
      value: 'php',
      text: 'PHP',
    },
    {
      value: 'node',
      text: 'Node/Express',
    },
    {
      value: 'nonrelationalDbs',
      text: 'Non-Relational Databases',
    },
    {
      value: 'none',
      text: 'N/A',
    },
    {
      value: 'other',
      text: 'Other',
    },
  ];

  const frontendTech = [
    {
      value: 'html',
      text: 'HTML & CSS',
    },
    {
      value: 'js',
      text: 'Javascript',
    },
    {
      value: 'react',
      text: 'React',
    },
    {
      value: 'ruby',
      text: 'Ruby / Ruby on Rails',
    },
    {
      value: 'none',
      text: 'N/A',
    },
    {
      value: 'other',
      text: 'Other',
    },
  ];

  const webtools = [
    {
      value: 'airtable',
      text: 'Airtable',
    },
    {
      value: 'figma',
      text: 'Figma',
    },
    {
      value: 'miro',
      text: 'Miro',
    },
    {
      value: 'trello',
      text: 'Trello',
    },
    {
      value: 'gitbook',
      text: 'Gitbook',
    },
    {
      value: 'none',
      text: 'N/A',
    },
    {
      value: 'other',
      text: 'Other',
    },
  ];

  const webPlatforms = [
    {
      value: 'squarespace',
      text: 'Squarespace',
    },
    {
      value: 'wix',
      text: 'Wix',
    },
    {
      value: 'wordpress',
      text: 'Wordpress',
    },
    {
      value: 'netlify',
      text: 'Netlify',
    },
    {
      value: 'github',
      text: 'Github',
    },
    {
      value: 'none',
      text: 'N/A',
    },
    {
      value: 'other',
      text: 'Other',
    },
  ];

  return (
    <div>
      <h3>Background</h3>
      <BodySubText>Update this volunteer&apos;s background info.</BodySubText>
      <ProfileInfoContainer>
        <Label3>Goal</Label3>
        <BodySubText>
          Is this volunteer hoping to further develop a core skill set or looking to try something
          new?
        </BodySubText>
        {isEditing ? (
          <>
            <StackedInput
              key={`${volunteer.id}-goal-skillset`}
              labelText="Yes, one of the reasons is to strengthen my skillset."
              value="Yes, one of the reasons is to strengthen my skillset."
              name="goal"
              checked={volunteer.goal == 'Yes, one of the reasons is to strengthen my skillset.'}
              onChange={updateVolunteerCopy}
              type="radio"
            />
            <StackedInput
              key={`${volunteer.id}-goal-new`}
              labelText="Yes, one of the reasons is I want to try something new."
              value="Yes, one of the reasons is I want to try something new."
              name="goal"
              checked={volunteer.goal == 'Yes, one of the reasons is I want to try something new.'}
              onChange={updateVolunteerCopy}
              type="radio"
            />
            <StackedInput
              key={`${volunteer.id}-goal-both`}
              labelText="Both"
              value="Both"
              name="goal"
              checked={volunteer.goal == 'Both'}
              onChange={updateVolunteerCopy}
              type="radio"
            />
            <StackedInput
              key={`${volunteer.id}-goal-neither`}
              labelText="Neither"
              value="Neither"
              name="goal"
              checked={volunteer.goal == 'Neither'}
              onChange={updateVolunteerCopy}
              type="radio"
            />
          </>
        ) : (
          <BodyText2>{volunteer.goal}</BodyText2>
        )}
      </ProfileInfoContainer>
      <ProfileInfoContainer>
        <Label3>
          Does this volunteer have at least more than 1 year of experience in a role in the tech
          industry?
        </Label3>
        {isEditing ? (
          <>
            <StackedInput
              key={`${volunteer.id}-experience-yes`}
              labelText="Yes"
              value
              name="experience"
              checked={volunteer.experience}
              onChange={updateVolRadio}
              type="radio"
            />
            <StackedInput
              key={`${volunteer.id}-experience-no`}
              labelText="No"
              value={false}
              name="experience"
              checked={!volunteer.experience}
              onChange={updateVolRadio}
              type="radio"
            />
          </>
        ) : (
          <BodyText2>{volunteer.experience ? 'Yes' : 'No'}</BodyText2>
        )}
      </ProfileInfoContainer>
      <ProjectInfoField
        label="The Leadership Roles Which Interest this Volunteer:"
        valueText={volunteer.leadershipRole?.join(', ')}
        value={volunteer.leadershipRole}
        isEditing={isEditing}
        changeListener={arrayListener}
        options={skills.map((skill) => ({ value: skill.name, text: skill.name }))}
        type="checkbox"
        name="leadershipRole"
      />
      <ProjectInfoField
        label="This Volunteer has Experience with the Following Backend Tech:"
        valueText={volunteer.backendTech?.join(', ')}
        value={volunteer.backendTech}
        isEditing={isEditing}
        changeListener={arrayListener}
        options={backendTech.map((tech) => ({ value: tech.value, text: tech.text }))}
        type="checkbox"
        name="backendTech"
      />
      <ProjectInfoField
        label="This Volunteer has Experience with the Following Frontend Tech:"
        valueText={volunteer.frontendTech?.join(', ')}
        value={volunteer.frontendTech}
        isEditing={isEditing}
        changeListener={arrayListener}
        options={frontendTech.map((tech) => ({ value: tech.value, text: tech.text }))}
        type="checkbox"
        name="frontendTech"
      />
      <ProjectInfoField
        label="This Volunteer has Experience with the Following Webtools:"
        valueText={volunteer.webtools?.join(', ')}
        value={volunteer.webtools}
        isEditing={isEditing}
        changeListener={arrayListener}
        options={webtools.map((tech) => ({ value: tech.value, text: tech.text }))}
        type="checkbox"
        name="webtools"
      />
      <ProjectInfoField
        label="This Volunteer has Experience with the Following Web Platforms:"
        valueText={volunteer.webPlatforms?.join(', ')}
        value={volunteer.webPlatforms}
        isEditing={isEditing}
        changeListener={arrayListener}
        options={webPlatforms.map((tech) => ({ value: tech.value, text: tech.text }))}
        type="checkbox"
        name="webPlatforms"
      />
    </div>
  );
};

export default Background;
