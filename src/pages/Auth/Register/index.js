import { Navigate } from 'react-router-dom';
import { Container, Img, Wrapper } from './styles';
import csLogo from '../../../assets/images/cs-logo.png';
import RegisterForm from '../../../components/RegisterForm';
import { useAuth } from '../../../hooks/useAuth';

function Register() {
  const { user, userStore } = useAuth();
  if (user && userStore.user) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <Container>
      <Wrapper>
        <Img src={csLogo} alt="Adriana Sotto" />
        <RegisterForm />
      </Wrapper>
    </Container>
  );
}

export default Register;
