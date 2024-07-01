import React from 'react';
import { ButtonStyle } from '../../../styles/components/Button.style';

const VolunteerModalFooter = ({ visible, isEditing, editInfo, saveInfo }) => {
  if (visible) {
    return (
      <>
        <ButtonStyle
          variant={!isEditing ? 'solid blue' : 'solid white'}
          disabled={isEditing}
          onClick={editInfo}
        >
          Edit
        </ButtonStyle>
        <ButtonStyle
          variant={isEditing ? 'solid blue' : 'solid white'}
          disabled={!isEditing}
          onClick={saveInfo}
        >
          Save
        </ButtonStyle>
      </>
    );
  }
  return null;
};

export default VolunteerModalFooter;
