import styled from 'styled-components';

export const ContentBoxLinkContainer = styled.div`
    border-top: solid 1px var(--peachShade1);
    border-bottom: solid 1px var(--peachShade1);
    margin: ${({ variant }) => variant === 'large' ? '32': '24'}px -32px;
    display: flex;
`;

export const ContentBoxContentContainer = styled.div`
    display: ${({ active }) => active ? 'block' : 'none'};
`;

export const ContentBoxFootContainer = styled.div`
    margin: ${({ variant }) => variant === 'large' ? '32': '24'}px -32px;
    border-top: solid 1px var(--peachShade1);
`;