import React, { useState, useEffect } from 'react';
import { Label3, BodyText2 } from '../../styles/components/Typography';
import { ProfileInfoContainer } from '../../styles/components/VolunteerModal.style';

const ProjectInfoField = ({ label, value, isEditing }) => {
    if (isEditing) {
        return <h3>Edit</h3>
    };

    return (
        <ProfileInfoContainer>
            <Label3>{label}</Label3>
            <BodyText2>{value || '--'}</BodyText2>
        </ProfileInfoContainer>
    );
};

export default ProjectInfoField;
