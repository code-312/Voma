import styled from 'styled-components';
import LoginForm from '../components/LoginForm';
import useTitle from '../hooks/useTitle';

const StyledLoginPage = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Login() {
  useTitle('Voma | Login');

  return (
    <StyledLoginPage>
      <LoginForm />
    </StyledLoginPage>
  );
}
