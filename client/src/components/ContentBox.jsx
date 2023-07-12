/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { Card } from '../styles/components/Card.style';
import { HeaderLinkContainer, HeaderLink } from '../styles/components/HeaderLink.style';
import { ContentBoxLinkContainer, ContentBoxContentContainer, ContentBoxFootContainer } from '../styles/components/ContentBox.style';

const ContentBox = ({ headContent, links, variant = 'small', bodyContent, footContent }) => {
    const [activePage, setActivePage] = useState(0);
    

    return (
        <Card>
            {headContent}
            <ContentBoxLinkContainer variant={variant}>
                { links.map((link, index) => (
                    <HeaderLinkContainer active={activePage === index} key={link}> 
                        <HeaderLink 
                            onClick={() => setActivePage(index)} 
                            variant={variant}
                        >
                            {link}
                        </HeaderLink>
                    </HeaderLinkContainer>
                ))}
                </ContentBoxLinkContainer>
            { bodyContent.map((item, index) => (
                <ContentBoxContentContainer active={activePage === index} key={index}>
                    {item}
                </ContentBoxContentContainer>))}
            <ContentBoxFootContainer variant={variant}>
                { footContent } 
            </ContentBoxFootContainer>
        </Card>
    )
};

export default ContentBox;
