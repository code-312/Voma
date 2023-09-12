import React, { useState, useEffect } from 'react';
import { Label3, BodyText2 } from '../../styles/components/Typography';
import { StyledInput } from '../../styles/components/Input.style';
import { ProfileInfoContainer } from '../../styles/components/VolunteerModal.style';

const ProjectInfoField = ({ label, value, isEditing, type, options }) => {
    if (isEditing) {
        return (
            <ProfileInfoContainer>
                <Label3>{label}</Label3>
                { type === 'input' && 
                    <StyledInput placeholder={label} value={value} />
                }
                {/* { type === 'radio' && 
                <StackedInput 
                    key={option.id}
                    labelText={option.labelText}
                    value={option.value}
                    id={option.id}
                    name="bestHobbit"
                    checked={radioChoice === option.value}
                    onChange={radioListener}
                    type="radio"
                />
                } */}
            </ProfileInfoContainer>
        )
    };

    return (
        <ProfileInfoContainer>
            <Label3>{label}</Label3>
            <BodyText2>{value || '--'}</BodyText2>
        </ProfileInfoContainer>
    );
};

export default ProjectInfoField;
