import { useContext } from 'react';
import { AuthContext } from '../lib/AuthProvider';

export default function Logout() {
  const AuthUser = useContext(AuthContext);
  AuthUser.logout();

  return <></>;
}
