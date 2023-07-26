/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Label3, BodySubText, BodySubLabel } from '../../../../styles/components/Typography';
import { ProfileInfoContainer } from '../../../../styles/components/VolunteerModal.style';


const Activity = ({ events }) => {
    console.log(events);
    return (
    <>
        <h3>Activity</h3>
        <BodySubText>Review and update a volunteer&apos;s progress and status.</BodySubText>
        
            { events.length > 0 ? 
                events.map((event) => {
                    const { name, createdAt } = event;
                    const formatted = new Date(createdAt);
                    /* object as children error :( */
                    return (
                        <ProfileInfoContainer key={name}>
                            <Label3>{name}</Label3>
                            <BodySubLabel>{formatted.toLocaleString('en-US')}</BodySubLabel>
                        </ProfileInfoContainer>
                    );
                })
            :
            <BodySubText>No Events</BodySubText>
        }
    </>
    );
};

export default Activity;
