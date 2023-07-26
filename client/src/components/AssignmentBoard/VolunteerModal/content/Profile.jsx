import React from 'react';
import RequiredLabel from '../../../RequiredLabel';
import { BodyText2, BodySubText, Label3 } from '../../../../styles/components/Typography';
import { ProfileInfoContainer } from '../../../../styles/components/VolunteerModal.style';

const Profile = ({ volunteer }) => {
    console.log("A thing");
    return (
        <div>
            <h3>Profile</h3>
            <BodySubText>Update this volunteer&apos;s basic info.</BodySubText>
            <RequiredLabel />
            <ProfileInfoContainer>
                <Label3>Slack User ID</Label3>
                <BodyText2>{volunteer.slackUserId}</BodyText2>
            </ProfileInfoContainer>
            <ProfileInfoContainer>
                <Label3>Email Address</Label3>
                <BodyText2>{volunteer.email}</BodyText2>
            </ProfileInfoContainer>
            <ProfileInfoContainer>
                <Label3>Pronouns</Label3>
                <BodyText2>{volunteer.pronouns}</BodyText2>
            </ProfileInfoContainer>
            <ProfileInfoContainer>
                <Label3>Is this volunteer active?</Label3>
                <BodyText2>{volunteer.active ? 'Yes' : 'No'}</BodyText2>
            </ProfileInfoContainer>
        </div>
    )
};

export default Profile;