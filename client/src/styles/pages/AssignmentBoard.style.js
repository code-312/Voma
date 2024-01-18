import styled from 'styled-components';
import { BodyText2 } from '../components/Typography';

export const VolunteerPageSidebar = styled.div`
    padding-left: 16px;
    padding-right: 24px;
    ${BodyText2} {
        margin-bottom: 12px;
    }
`;

export const VolunteerProjectCard = styled.div`
    min-width: 290px;
    padding: 16px 16px 24px 16px;
    background-color: var(--lightPeach);
    border-radius: 6px;
    margin: 16px 12px 24px 12px;
    &:first-of-type {
        margin-left: 24px;
    }
    &:last-of-type {
        margin-right: 24px;
    }

    h4 {
        margin-bottom: 24px;
    }
`;