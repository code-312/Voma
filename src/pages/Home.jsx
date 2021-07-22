import styled from 'styled-components';

const StyledSection = styled.section`
    width: 50%;
    margin: 0 auto;
    padding-top: 100px;
    font-family: 'IBM Plex Sans', sans-serif;
`;

const StyledH1 = styled.h1`
    font-size: 48px;
    font-weight: 600;
`;

const StyledParagraph = styled.p`
    font-size: 18px;
`;

const StyledImg = styled.img`
    width: 50%;
`;

const StyledA = styled.a`
    color: blue;
    text-decoration: underline;
`;

export default function Home() {
    return (
        <StyledSection>
                <StyledH1>Sign in with Slack</StyledH1>
                <StyledParagraph>We utilize Slack throughout our onboarding process. If you haven&#39;t already, please join our <StyledA href="https://code-for-chicago-slack-invite.herokuapp.com/">Slack</StyledA> and come back here to sign in.</StyledParagraph>
                <StyledImg src="https://platform.slack-edge.com/img/sign_in_with_slack.png" srcSet="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x" alt="slack button" />
        </StyledSection>
    )
}
