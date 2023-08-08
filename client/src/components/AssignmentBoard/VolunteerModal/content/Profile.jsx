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
        if (e.currentTarget.value === "true") {
            value = true;
        } else {
            value = false;
        }
        // Then we have to pass it this mock event object... probably a good idea to refactor
        updateVolunteerCopy({ currentTarget: { name: e.currentTarget.name, value }});
    }

    return (
        <div>
            <h3>Profile</h3>
            <BodySubText>Update this volunteer&apos;s basic info.</BodySubText>
            <RequiredLabel />
            <ProfileInfoContainer>
                {isEditing &&
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
                    
                }
                <Label3>Slack User ID</Label3>
                {isEditing ? 
                    <StyledInput 
                        type="text" 
                        placeholder="Slack User Id" 
                        name="slackUserId" 
                        onChange={updateVolunteerCopy} 
                        value={volunteer.slackUserId}
                    />
                :    
                    <BodyText2>{volunteer.slackUserId}</BodyText2>
                }
            </ProfileInfoContainer>
            <ProfileInfoContainer>
                <Label3>Email Address</Label3>
                { isEditing ? 
                    <StyledInput
                        type='text'
                        placeholder="Email Address"
                        name="email"
                        onChange={updateVolunteerCopy}
                        value={volunteer.email}
                    />
                :
                    <BodyText2>{volunteer.email}</BodyText2>
                }
            </ProfileInfoContainer>
            <ProfileInfoContainer>
                <Label3>Pronouns</Label3>
                {isEditing ?
                    <StyledInput
                        type="text"
                        placeholder="Pronouns"
                        name="pronouns"
                        onChange={updateVolunteerCopy}
                        value={volunteer.pronouns}
                    />
                :
                    <BodyText2>{volunteer.pronouns}</BodyText2>
                }
            </ProfileInfoContainer>
            <ProfileInfoContainer>
                <Label3>Is this volunteer active?</Label3>
                {isEditing ?
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
                :
                    <BodyText2>{volunteer.active ? 'Yes' : 'No'}</BodyText2>
                }
            </ProfileInfoContainer>
        </div>
    )
};

export default Profile;