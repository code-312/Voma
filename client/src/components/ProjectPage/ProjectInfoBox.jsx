import React from 'react';
import { Typography } from '@mui/material';
import { ProjectInfoSection, ProjectInfoField } from '../../styles/pages/ProjectPage.style';

const ProjectInfoBox = ({ fields, header, mainHeader }) => (
        <ProjectInfoSection>
            <Typography variant={mainHeader ? 'h4' : 'h5'} gutterBottom>{header}</Typography>
            {fields.map((field, index) => 
            // eslint-disable-next-line react/no-array-index-key
                (<ProjectInfoField key={`field-${index}`}>
                    <Typography variant="overline">{field.label}</Typography>
                    <Typography varitant="subtitle-1">{field.value}</Typography>
                </ProjectInfoField>)
            )}
        </ProjectInfoSection>
    )
export default ProjectInfoBox;
