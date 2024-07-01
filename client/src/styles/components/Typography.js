import styled from 'styled-components';

export const BodyText2 = styled.p`
  font-size: 16px;
  white-space: break-spaces;
`;

export const BodyText3 = styled.p`
  font-size: 14px;
`;

export const Label1 = styled.label`
  font-size: 20px;
  font-weight: medium;
`;

export const Label2 = styled.label`
  font-size: 18px;
`;

export const Label3 = styled.label`
  font-size: 1rem;
`;

export const Label4 = styled.label`
  font-size: 14px;
`;

export const BodySubText = styled(BodyText2)`
  color: var(--blueShade2);
`;

export const BodySubLabel = styled(BodyText3)`
  color: var(--blueShade2);
`;

export const AlertText = styled(BodyText3)`
  color: var(--uiError);
`;

export const PseudoLink = styled(BodyText2)`
  text-decoration: underline;
  cursor: pointer;
`;
