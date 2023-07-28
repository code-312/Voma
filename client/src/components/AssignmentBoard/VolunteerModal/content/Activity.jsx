/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { Label3, BodySubText, BodySubLabel } from '../../../../styles/components/Typography';
import { ProfileInfoContainer } from '../../../../styles/components/VolunteerModal.style';
import { StyledInput } from '../../../../styles/components/Input.style';


const Activity = ({ events, isEditing, volunteerId }) => {
    const [newActivity, setNewActivity] = useState([]);

    const updateActivity = (e) => {
        const { id } = e.currentTarget;
        const activityCopy = [...newActivity];
        const index = newActivity.findIndex((event) => event.id === id);


    }

    useEffect(() => {
        if (events) {
            setNewActivity([...events]);
        }
    }, [events])

    return (
    <>
        <h3>Activity</h3>
        <BodySubText>Review and update a volunteer&apos;s progress and status.</BodySubText>
        { newActivity.length > 0 ? 
            newActivity.map((event) => {
                const { name, createdAt, id } = event;
                const formatted = new Date(createdAt);
                return (
                    <ProfileInfoContainer key={`${volunteerId}-${name}-${createdAt}`}>
                        { !isEditing ?
                            <Label3>{name}</Label3>
                        :
                            <StyledInput
                                type='text'
                                value={event.name}
                                id={id}
                                placeholder="Add New Acitivity"
                            />
                            // Todo: a lot more

                        }
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
