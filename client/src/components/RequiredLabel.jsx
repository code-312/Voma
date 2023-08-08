import React from 'react';
import { AlertText } from '../styles/components/Typography';
import { RequiredLabelHolder, StyledAlertIcon } from '../styles/components/RequiredLabel.style';

const RequiredLabel = () => (
    <RequiredLabelHolder>
        <StyledAlertIcon /> <AlertText>Required</AlertText>
    </RequiredLabelHolder>
);

export default RequiredLabel;