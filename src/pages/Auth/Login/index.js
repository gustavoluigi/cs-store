import { Link, Navigate } from 'react-router-dom';
import {
  Container, Img, NewRegister, Wrapper,
} from './styles';
import csLogo from '../../../assets/images/cs-logo.png';
import LoginForm from '../../../components/LoginForm';
import { useAuth } from '../../../hooks/useAuth';

function Login() {
  const { user, userStore } = useAuth();
  if (user && userStore.user) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <Container>
      <Wrapper>
        <Img src={csLogo} alt="Adriana Sotto" />
        <LoginForm />
        <NewRegister>
          <Link to="/cadastrar">Novo Cadastro</Link>
        </NewRegister>
      </Wrapper>
    </Container>
  );
}

export default Login;
