import React from 'react';
import Button from '../Button';
import { StyledInput } from '../../styles/components/Input.style';
import { ProjectLinkEditContainer } from '../../styles/pages/ProjectPage.style';

const ProjectLink = ({ id, url, title, titleListener, urlListener, deleteLink }) => {
  const updateTitle = (e) => {
    titleListener(id, e.currentTarget.value);
  };

  const updateUrl = (e) => {
    urlListener(id, e.currentTarget.value);
  };

  return (
    <ProjectLinkEditContainer>
      <StyledInput value={title} placeholder="Link Title" onChange={updateTitle} />
      <StyledInput value={url} placeholder="Link URL" onChange={updateUrl} />
      <Button onClick={() => deleteLink(id)} variant="text-only red">
        Delete
      </Button>
    </ProjectLinkEditContainer>
  );
};

export default ProjectLink;
