import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledSection = styled.section`
  width: 50vw;
  margin: 0 auto;

  h1 {
    padding: 3rem 0 1rem 0;
    font-size: 2rem;
    font-weight: 700;
  }

  p {
    font-size: 1rem;
  }
`;

export default function NoOnboarding() {
  return (
    <StyledSection>
      <h1>We appreciate your enthusiasm!</h1>
      <p>
        At this time new members are required to attend an Onboarding Night. If you haven&apos;t
        attended Onboarding Night yet then register and attend one through our Meetup Page: &nbsp;
        <a href="https://www.meetup.com/code-for-chicago">
          https://www.meetup.com/code-for-chicago
        </a>
      </p>
      <p>We&apos;d love to see you then!</p>

      <Link to="/">
        <button type="button">Start Over</button>
      </Link>
    </StyledSection>
  );
}
