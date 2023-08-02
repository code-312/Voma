/* eslint-disable eqeqeq */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import ActivityInput from './ActivityInput';
import Button from '../../../Button';
import { Label3, BodySubText, BodySubLabel } from '../../../../styles/components/Typography';
import { ProfileInfoContainer } from '../../../../styles/components/VolunteerModal.style';
import { StyledInput } from '../../../../styles/components/Input.style';


const Activity = ({ events, isEditing, volunteerId, trackActivityChange, addNewActivity }) => {
    const [updatedActivity, setUpdatedActivity] = useState([]);

    return (
    <>
        <h3>Activity</h3>
        <BodySubText>Review and update a volunteer&apos;s progress and status.</BodySubText>
        { events.length > 0 ? 
            events.map((event) => {
                const { name, createdAt, id, isNew } = event;
                const formatted = new Date(createdAt);
                return (
                    <ProfileInfoContainer key={`${volunteerId}-${name}-${createdAt}`}>
                        { !isEditing ?
                            <Label3>{name}</Label3>
                        :
                            <ActivityInput id={id} initialValue={name} storeNewValue={trackActivityChange} isNew={isNew} />
                        }
                        <BodySubLabel>{formatted.toLocaleString('en-US')}</BodySubLabel>
                    </ProfileInfoContainer>
                );
            })
        :
            <ProfileInfoContainer>
                <BodySubText>No Events</BodySubText>
            </ProfileInfoContainer>
        }
        {isEditing && (
                <Button 
                    variant="fw outline blue" 
                    icon={PlusCircle} 
                    onClick={addNewActivity}>
                        Add Note
                    </Button>
            )
        }
    </>
    );
};

export default Activity;
