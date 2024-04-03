import React, { useState } from 'react';
import { archiveProject } from '../../lib/Requests';
import Button from '../Button';
import ArchiveProjectModal from './ArchiveProjectModal';

const ProjectSettings = ({ id }) => {
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <>
            <ArchiveProjectModal 
                isOpen={modalOpen}
                closeFn={closeModal}
                id={id}
            />
            <Button variant="outline blue" onClick={openModal}>Archive Project</Button>
        </>
    )
}

export default ProjectSettings;
