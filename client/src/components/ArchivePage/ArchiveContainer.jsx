import React, { useState } from 'react';
import { Card } from '../../styles/components/Card.style';
import ArchiveAccordion from './ArchiveAccordion';
import DeleteProjectModal from './DeleteProjectModal';
import ReactivateProjectModal from './ReactivateProjectModal';

const ArchiveContainer = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [reactivateModalOpen, setReactivateModalOpen] = useState(false);

  const openDelete = () => setDeleteModalOpen(true);
  const closeDelete = () => setDeleteModalOpen(false);
  const openReactivate = () => setReactivateModalOpen(true);
  const closeReactivate = () => setReactivateModalOpen(false);

  const triggerDeleteModal = (id) => {
    setSelectedProject(id);
    openDelete();
  };

  const triggerReactivateModal = (id) => {
    setSelectedProject(id);
    openReactivate();
  };

  return (
    <>
      <DeleteProjectModal
        isOpen={deleteModalOpen}
        closeFn={closeDelete}
        selectedProject={selectedProject}
      />
      <ReactivateProjectModal
        isOpen={reactivateModalOpen}
        closeFn={closeReactivate}
        selectedProject={selectedProject}
      />
      <Card>
        <h1>Archive Library</h1>

        {projects.length > 0 ? (
          projects.map((project) => (
            <ArchiveAccordion
              key={project.id}
              project={project}
              triggerDeleteModal={triggerDeleteModal}
              triggerReactivateModal={triggerReactivateModal}
            />
          ))
        ) : (
          <h4>No projects have been archived.</h4>
        )}
      </Card>
    </>
  );
};

export default ArchiveContainer;
