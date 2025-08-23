import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
// import useFetch from '../../utils/hooks/useFetch';
// import useMutation from '../../utils/hooks/useMutation';


export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  // const callapi = useMutation("/artist/join-contest", "post")

  // const {data} = useFetch<{category: string}>("/joke/any")
  // console.log(data)

  const handleLogin = () => {
    // callapi.mutate().then(resp => console.log(resp)).catch((err)=>console.log(err.response))
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
