import styled from 'styled-components';

export const AccordionWrapper = styled.div`
  color: var(--managementBlue);
  background-color: var(--lightPeach);
  margin-bottom: 16px;
  width: 542px;
`;

export const AccordionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  cursor: pointer;
  border: 1px solid var(--peachShade1);
  border-radius: 4px;
  border-bottom-left-radius: ${({ isOpen }) => (isOpen ? '0' : '4px')};
  border-bottom-right-radius: ${({ isOpen }) => (isOpen ? '0' : '4px')};

  &:hover {
    background-color: var(--peachShade1);
  }
`;

export const AccordionContent = styled.div`
  font-size: 16px;
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  border: 1px solid var(--peachShade1);
  border-top: none;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;
