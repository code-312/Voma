import React from 'react';
import { Link as LinkIcon, PlusCircle } from 'lucide-react';
import Button from '../Button';
import ProjectLink from './ProjectLink';
import { ProjectLinkContainer } from '../../styles/pages/ProjectPage.style';
import { Label3 } from '../../styles/components/Typography';

const ProjectLinks = ({ isEditing, links, linkListener, createLink, deleteLink, projectId }) => {
    const updateTitle = (id, newTitle) => {
        const currLink = links.find(link => link.id === id);
        const newLink = {...currLink};
        newLink.title = newTitle;

        linkListener(newLink);
    }

    const updateUrl = (id, newUrl) => {
        const currLink = links.find(link => link.id === id);
        const newLink = {...currLink};
        newLink.url = newUrl;

        linkListener(newLink);
    }

    if (isEditing) {
        return (
            <>
                {links.map((link) => (
                    <ProjectLink
                        key={`${projectId}-link-${link.id}`}
                        title={link.title}
                        id={link.id}
                        url={link.url}
                        titleListener={updateTitle}
                        urlListener={updateUrl}
                        deleteLink={deleteLink}
                    />
                ))}
                <Button 
                    variant="fw outline blue" 
                    icon={PlusCircle} 
                    onClick={createLink}>
                        Add Link
                </Button>
            </>
        );
    }
    if (links && links.length > 0) {
        return links.map(link => (
            <>
                <Label3>{link.title}</Label3>
                <ProjectLinkContainer>
                    <LinkIcon />
                    <a href={link.url}>{link.url}</a>
                </ProjectLinkContainer>
            </>
        ))
    }
    
    return <Label3>There are no links associated with this project.</Label3>
 
}

export default ProjectLinks;
