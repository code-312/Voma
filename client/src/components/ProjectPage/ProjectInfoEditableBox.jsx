import React from 'react';
import { Typography } from '@mui/material';
import ProjectNameField from './ProjectInfoFormFields/ProjectNameField';
import RadioButtons from './ProjectInfoFormFields/RadioButtons';
import ProjectTextField from './ProjectInfoFormFields/ProjectTextField';
import ProjectCheckbox from './ProjectInfoFormFields/ProjectCheckbox';
import ProjectLink from './ProjectInfoFormFields/ProjectLink';
import { ProjectInfoSection, ProjectInfoField } from '../../styles/pages/ProjectPage.style';

const ProjectInfoEditableBox = ({ fields, header, mainHeader, onChange }) => {
    const getFormField = (field) => {
        if (field.type === 'radio') {
            return (
                <RadioButtons 
                    options={field.options} 
                    name={field.name} 
                    onChange={onChange} 
                    currentValue={field.currentValue} 
                />
            )
        }
        if (field.type === 'textfield') {
            return (
                <ProjectTextField 
                    currentValue={field.currentValue} 
                    onChange={onChange} 
                    name={field.name}
                />
            );
        }
        if (field.type === 'checkbox') {
            return (
                <ProjectCheckbox 
                    options={field.options}
                    name={field.name}
                    onChange={field.onChange}
                    currentValues={field.currentValues}
                />
            )
        }
        if (field.type === 'link') {
            return (
                <ProjectLink link={field} onChange={onChange} />
            )
        }
        return null;
    }
    return (
        <ProjectInfoSection>
            { mainHeader ? 
                <ProjectNameField name={header} onChange={onChange} />
                :
                <Typography variant="h5" gutterBottom>{header}</Typography>
            }
            {fields.map((field, index) => 
            // eslint-disable-next-line react/no-array-index-key
                (<ProjectInfoField key={`field-${index}`}>
                    <Typography variant="overline">{field.label}</Typography>
                    { getFormField(field) }
                </ProjectInfoField>)
            )}
        </ProjectInfoSection>
    );
};
export default ProjectInfoEditableBox;
