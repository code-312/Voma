import styled from 'styled-components';
import { AlertCircle } from 'lucide-react';

export const StyledAlertIcon = styled(AlertCircle)`
  color: var(--uiError);
  height: 14px;
  width: 14px;
  margin-right: 4px;
`;

export const RequiredLabelHolder = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;
