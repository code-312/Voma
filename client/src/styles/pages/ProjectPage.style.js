import styled from 'styled-components';

export const ProjectSidebarContainer = styled.div`
    background-color: #fff;
    padding: 8px;
    width: 100%;
    height: 100%;
`;

export const ProjectSidebarProject = styled.div`
    padding: 12px 16px;
    color: rgba(0, 0, 0, 0.6);   
    background-color: #fff;
    cursor: pointer;
    ${(props) => props.$selected &&
        `color: #6200EE;
        background-color: #F2E7FE;
        `
    }
`;

export const ProjectInfoContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 20px 64px 100px 64px;
`

export const ProjectInfoSection = styled.div`
    margin: 12px;
    padding: 24px;
    flex: 1;
    background-color: #fff;
    h4, h5 {
        color: rgba(0, 0, 0, 0.87);
    }

    .MuiTypography-overline {
        color: rgba(0, 0, 0, 0.6);
    }

    .MuiTypography-body1 {
        color: rgba(0, 0, 0, 0.87);
        white-space: break-spaces;
    }
`;

export const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ProjectInfoField = styled.div`
    margin: 10px 0;
`;