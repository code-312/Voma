/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { Card } from '../styles/components/Card.style';
import { HeaderLinkContainer, HeaderLink } from '../styles/components/HeaderLink.style';
import { ContentBoxLinkContainer, ContentBoxContentContainer, ContentBoxFootContainer } from '../styles/components/ContentBox.style';

const ContentBox = ({ 
    headContent, 
    links, 
    headerClickFn = null, 
    variant = 'small', 
    bodyContent, 
    footContent,
    marginTop = false
}) => {
    const [activePage, setActivePage] = useState(0);
    
    const handleHeaderClick = (index) => {
        if (headerClickFn) {
            headerClickFn(index);
        }
        setActivePage(index);
    }
    return (
        <Card marginTop={marginTop}>
            {headContent}
            <ContentBoxLinkContainer variant={variant}>
                { links.map((link, index) => (
                    <HeaderLinkContainer active={activePage === index} key={link}> 
                        <HeaderLink 
                            onClick={() => handleHeaderClick(index)} 
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
