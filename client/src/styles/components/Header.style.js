import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledHeader = styled.div`
  height: 56px;
  position: fixed;
  width: 100%;
  background-color: var(--lightPeach);
  border-bottom: solid 1px var(--peachShade1);
  display: flex;
  align-items: center;
  line-height: 56px;
  padding: 0 24px;
  justify-content: space-between;
`;

export const LoginLink = styled(Link)`
  color: var(--managementBlue);
  &:hover {
    color: var(--uiBlue);
  }
`;

export const ProfileIndicator = styled.div`
  border-radius: 100%;
  background-color: var(--volunteerGreen);
  height: 32px;
  width: 32px;
  color: #fff;
  line-height: 32px;
  text-align: center;
  font-size: 18px;
`;
