import styled from 'styled-components';

export const VolunteerModalContainer = styled.div`
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 75%;
    background-color: #fff;
    border: 2px solid #000;
    box-shadow: 2px 2px 3px #666;
`;

export const VolunteerModalSidebar = styled.div`
    flex: 1;
    border-right: solid 1px #938F9B;
`;

export const VolunteerSidebarTabContainer = styled.div`
    display: flex;
    padding: 16px;
    ${(props) => !props.$noHover && `cursor: pointer;`}
    
    h2 {
        color: black;
    }

    path {
        fill: #666;
    }

    .MuiTypography-subtitle-2 {
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        letter-spacing: 0.1px;
        color: #666666;
        padding-left: 32px;
    }
    ${(props) => props.$active && `
        background-color: rgba(98, 0, 238, 0.08);
        .MuiTypography-subtitle-2 {
            color: #6200EE;
        }
        path {
            fill: #6200EE;
        }
    `}
`

export const VolunteerSidebarHeader = styled.div`
    padding-left: 32px;
    .MuiTypography-paragraph {
        font-weight: 500;
        font-size: 13px;
        line-height: 16px;
        color: #666666;
    }
`;

// export const VolunteerTabLabel = styled.

export const VolunteerModalContent = styled.div`
    flex: 2;
    padding: 16px;
    .MuiTypography-body1 {
        margin-top: 0;
    }
    .MuiTypography-overline {
        color: #666;
    }
    .MuiTypography-subtitle-1 {
        color: rgba(0, 0, 0, 0.87);
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: 0.15px;
        margin-bottom: 8px;
        margin-top: -8px;
    }
    h2 {
        color: black;
    }
`;

export const VolunteerTabTable = styled.table`
    padding: 8px;
    border-collapse: collapse;
    width: 100%;
    thead tr, tbody tr {
        border-bottom: solid 1px #938F9B;
    }

    td, th {
        padding: 16px;
        border-bottom: solid 1px #938F9B;
        font-size: 14px;
        line-height: 17px;
        color: #3A3535;
        font-family: 'Inter', sans-serif;
    }

    th {
        text-align: left;
        font-weight: 700;
    }
`;