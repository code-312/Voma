import React, { useEffect, useState } from 'react';
import { Link as LinkIcon } from 'lucide-react';
import { ProjectLinkContainer } from '../../styles/pages/ProjectPage.style';
import { Label3 } from '../../styles/components/Typography';

const ProjectLinks = ({ isEditing, links }) => {
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
    }, [links])

    if (isEditing) {
        return <h1>Editing!</h1>
    }

    return bodyContent;
}

export default ProjectLinks;
