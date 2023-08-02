import React, { useState } from 'react';
import VolunteerModal from './VolunteerModal/VolunteerModal';
import { skillLabels } from '../../lib/Skills';
import { VolunteerCardContainer, VolunteerLabel, VolunteerNameContainer } from '../../styles/components/VolunteerCard.style';


const VolunteerCard = ({ volunteer, projects, handleShowIndicator, handleViewedLS, icon = null}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const showIndicator = handleShowIndicator && handleShowIndicator(volunteer.id);
    const skill = volunteer.skills[0]?.name || 'default';
    
    const openModal = () => {
        if (showIndicator) {
            handleViewedLS(volunteer.id)
        }
        setModalOpen(true);
    }

    const closeModal = () => setModalOpen(false);

    const modalOpenKeyPress = (e) => {
        const { key } = e;
        if (key === 'Enter') {
            openModal();
        }
    }

    return (
        <>
            <VolunteerModal 
                volunteer={volunteer} 
                modalOpen={modalOpen} 
                closeModal={closeModal} 
                projects={projects} 
                skillDetails={skillLabels[skill]}
            />
            <VolunteerCardContainer 
                tabIndex={0} 
                onKeyDown={modalOpenKeyPress} 
                onClick={openModal} 
                closeModal={closeModal}
            >
                <VolunteerNameContainer>
                    {showIndicator ? icon : null}
                    {volunteer.name || 'Volunteer Name'}
                </VolunteerNameContainer>
                    <VolunteerLabel bgColor={skillLabels[skill].backgroundColor} color={skillLabels[skill].color}>
                        { skillLabels[skill].name }
                    </VolunteerLabel>
            </VolunteerCardContainer>
        </>
    )
};

export default VolunteerCard;
