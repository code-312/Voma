import styled from 'styled-components';

export const VolunteerCardContainer = styled.div`
  padding: 16px 12px;
  border-radius: 4px;
  background-color: var(--white);
  box-shadow: 1px 0px 4px 0px rgba(0, 0, 0, 0.05), 0px 1px 4px 0px rgba(0, 0, 0, 0.1),
    0px 2px 1px 0px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  margin-bottom: 12px;
  cursor: pointer;
  &:hover {
    background-color: var(--lightPeach);
  }
`;

export const VolunteerNameContainer = styled.div`
  display: flex;
  align-items: center;
  svg {
    height: 16px;
    color: var(--volunteerGreen);
  }
`;

export const VolunteerLabel = styled.div`
  padding: 2px 4px;
  border-radius: 20px;
  font-size: 12px;
  color: var(--${({ color }) => color});
  line-height: 16px;
  background-color: var(--${({ bgColor }) => bgColor});
  width: fit-content;
  margin-top: 8px;
`;
