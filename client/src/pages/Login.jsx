import LoginForm from '../components/LoginForm';
import useTitle from '../hooks/useTitle'

export default function Login() {
    useTitle('Voma | Login');

    return (<>
        <LoginForm />
    </>)
}
