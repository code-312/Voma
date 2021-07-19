import React from 'react';
import styled from 'styled-components';

const StyledPage = styled.page`
        color: red;
    `;

export default function Home() {
    return (
        <StyledPage>
            <div>
                <h1>Sign in with Slack</h1>
                <h2>We utilize Slack throughout our onboarding process. If you haven&#39;t already, please join our Slack and come back here to sign in.</h2>
                <img src="https://platform.slack-edge.com/img/sign_in_with_slack.png" srcSet="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x" alt="slack button" />
            </div>
        </StyledPage>
    )
}
