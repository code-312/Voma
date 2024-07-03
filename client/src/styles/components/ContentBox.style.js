import styled from 'styled-components';

export const ContentBoxLinkContainer = styled.div`
  border-top: solid 1px var(--peachShade1);
  border-bottom: solid 1px var(--peachShade1);
  margin: ${({ variant }) => (variant === 'large' ? '32' : '24')}px -32px;
  display: flex;
  justify-content: space-around;
`;

export const ContentBoxContentContainer = styled.div`
  display: ${({ active }) => (active ? 'block' : 'none')};
  margin-bottom: ${({ variant }) => (variant === 'large' ? '32' : '24')}px;
`;

export const ContentBoxFootContainer = styled.div`
  margin: ${({ variant }) => (variant === 'large' ? '32px -32px 0 -32px' : '24px -32px 0 -32px')};
  padding: ${({ variant }) => (variant === 'large' ? '32px 32px 0 32px' : '24px 24px 0 24px')};
  border-top: solid 1px var(--peachShade1);
  display: flex;
  gap: 16px;
`;
