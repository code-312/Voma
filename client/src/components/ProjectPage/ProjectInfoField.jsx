import React, { useState, useEffect } from 'react';
import { Label3, BodyText2 } from '../../styles/components/Typography';
import { StyledInput } from '../../styles/components/Input.style';
import { StyledTextarea } from '../../styles/components/StyledTextarea.style';
import StackedInput from '../StackedInputs';
import { ProfileInfoContainer } from '../../styles/components/VolunteerModal.style';

const ProjectInfoField = ({ 
    label, 
    value, 
    valueText = null, 
    isEditing, 
    name, 
    type, 
    options, 
    changeListener,
    displayEditOnly = false 
}) => {
    const [valueDisplay, setValueDisplay] = useState("");

    useEffect(() => {
        if (value && valueText) {
            setValueDisplay(valueText);
        } else {
            setValueDisplay(value);
        }
    }, [value, valueText])
    
    if (isEditing) {
        return (
            <ProfileInfoContainer>
                <Label3>{label}</Label3>
                { type === 'input' && 
                    <StyledInput placeholder={label} value={valueDisplay} />
                }
                { type === 'textbox' &&
                    <StyledTextarea 
                        placeholder={label} 
                        value={value || ""} 
                        onChange={changeListener}
                        name={name}
                    />
                }
                { type === 'radio' && options.map((option) => (
                        <StackedInput 
                            key={`${name}-${option.value}`}
                            labelText={option.text}
                            value={option.value}
                            name={name}
                            // eslint-disable-next-line eqeqeq
                            checked={value == option.value}
                            onChange={changeListener}
                            type="radio"
                        />
                    ))
                }
                { type === 'checkbox' && options.map((option) => (
                        <StackedInput
                            key={`${name}-${option.value}`}
                            labelText={option.text}
                            value={option.value}
                            checked={value.indexOf(option.value) !== -1}
                            onChange={changeListener}
                            type="checkbox"
                            name={name}
                        />
                    ))
                }
            </ProfileInfoContainer>
        )
    };

    if (!isEditing && displayEditOnly) {
        return null;
    }

    return (
        <ProfileInfoContainer>
            <Label3>{label}</Label3>
            <BodyText2>{valueDisplay || '--'}</BodyText2>
        </ProfileInfoContainer>
    );
};

export default ProjectInfoField;
