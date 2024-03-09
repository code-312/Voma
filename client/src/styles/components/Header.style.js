import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledHeader = styled.div`
    height: 3.5rem;
    position: sticky;
    width: 100%;
    background-color: var(--lightPeach);
    border-bottom: solid 1px var(--peachShade1);
    display: flex;
    align-items: center;
    line-height: 3.5rem;
    padding: 0 1.5rem;
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
    height: 2rem;
    width: 2rem;
    color: #fff;
    line-height: 2rem;
    text-align: center;
    font-size: 1.125rem;

`;


