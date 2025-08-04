import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate('/dashboard');
  };

  return (
    <AuthLayout>
      <div>
        <h2 className='text-primary'>Login</h2>
        <button onClick={handleLogin}>Log in</button>
      </div>
    </AuthLayout>
  );
}
