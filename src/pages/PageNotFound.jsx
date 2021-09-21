import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledSection = styled.section`
  width: 50vw;
  margin: 0 auto;

  @media (max-width: 900px){
    width: 80%;
  }

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
      <h1>404. Page Not Found</h1>
      <p>
        Whoops! The apge you are looking for does not exist.  Try going back or use the link below.
      </p>

      <Link to="/" className="button">
        Home
      </Link>
    </StyledSection>
  );
}
