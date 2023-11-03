import React, { useEffect, useState } from 'react';
import { Link as LinkIcon, PlusCircle } from 'lucide-react';
import Button from '../Button';
import ProjectLink from './ProjectLink';
import { ProjectLinkContainer } from '../../styles/pages/ProjectPage.style';
import { ProfileInfoContainer } from '../../styles/components/VolunteerModal.style';
import { StyledInput } from '../../styles/components/Input.style';
import { Label3 } from '../../styles/components/Typography';

const ProjectLinks = ({ isEditing, links, linkListener, createLink, deleteLink }) => {
    const [bodyContent, setBodyContent] = useState(<Label3>There are no links associated with this project.</Label3>)

    useEffect(() => {
        if (links && links.length > 0) {
            const formatted = links.map(link => (
                <>
                    <Label3>{link.title}</Label3>
                    <ProjectLinkContainer>
                        <LinkIcon />
                        <a href={link.url}>{link.url}</a>
                    </ProjectLinkContainer>
                </>
            ));

            setBodyContent(formatted);
        }
    }, [links]);

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

    // Todo: Links copy over to other projects?? 
    if (isEditing) {
        return (
            <>
                {links.map((link) => (
                    <ProjectLink
                        key={`link-${link.id}`}
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

    return bodyContent;
}

export default ProjectLinks;
