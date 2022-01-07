import React, { useEffect } from 'react';
import styled from 'styled-components';

const StyledSection = styled.section`
  width: 50%;
  margin: 0 auto;
  padding-top: 100px;

  @media (max-width: 900px){
    width: 80%;
  }
`;

const StyledH1 = styled.h1`
  font-size: 3rem;
  font-weight: 600;
`;

const StyledParagraph = styled.p`
  font-size: 1rem;
`;

const SlackButton = styled.button`
  border: none;
  padding: 0;
  margin: 0;
`;

const SlackImg = styled.img`
  width: 100%;
  border: none;
`;


export default function Home() {
  const testApi = () => {
    fetch('https://slack.com/api/admin.users.list', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_SLACK_BOT_TOKEN}`
      }
    })
    .then((res) => res.json()
      .then((json) => {
        console.log(json);
      }))
    .catch((err) => console.log(err));
  }
  
  useEffect(() => {
    testApi();
  }, []);

  return (
    <StyledSection>
      <StyledH1>Sign in with Slack</StyledH1>
      <StyledParagraph>
        We utilize Slack throughout our onboarding process. If you haven&#39;t already, please join
        our <a href="https://code-for-chicago-slack-invite.herokuapp.com/">Slack</a> and come back
        here to sign in.
      </StyledParagraph>
      <SlackButton type="button" aria-label="Sign in with Slack">
        <SlackImg
          src="https://platform.slack-edge.com/img/sign_in_with_slack.png"
          srcSet="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x"
          alt=""
        />
      </SlackButton>
    </StyledSection>
  );
}
