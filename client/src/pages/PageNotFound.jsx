import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledSection = styled.section`
  width: 50vw;
  margin: 0 auto;
  margin-bottom: 30px;
  @media (max-width: 900px) {
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

export default function PageNotFound() {
  return (
    <StyledSection>
      <h1>
        404. Page Not Found.
        <br />
        ¯\_(ツ)_/¯
      </h1>
      <p className="error-page">
        Whoops! The page you are looking for does not exist. Try going back or use the link below to
        go Home.
      </p>
      <Link to="/" className="button">
        Home
      </Link>
    </StyledSection>
  );
}
