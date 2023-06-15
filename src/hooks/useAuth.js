import { useNavigate } from 'react-router-dom';
import { create } from 'zustand';
import { useLocalStorage } from './useLocalStorage';
import { supabase } from '../services/utils/supabaseClient';
import { triggerToast } from '../utils/triggerToast';

export const useAuth = () => {
  const navigate = useNavigate();
  const [userStorage, setUserStorage] = useLocalStorage('user', null);
  const createUserStore = create((set) => ({ user: userStorage }));
  const userStore = createUserStore();
  const login = async (data) => {
    try {
      const { user, error } = await supabase.auth.signIn({
        email: data.email,
        password: data.password,
      });
      if (error) throw error;
      setUserStorage(user);
      navigate('../dashboard');
      return user;
    } catch (err) {
      triggerToast('error', 'Email ou senha inválidos!');
      return err.message;
    }
  };

  const register = async (data) => {
    try {
      const { user, error } = await supabase.auth.signUp(data);
      if (error) throw error;
      setUserStorage(user);
      triggerToast('success', 'Usuário cadastrado com sucesso!');
      setTimeout(() => {
        navigate('/');
      }, 2000);
      return user;
    } catch (err) {
      let errorMsg = '';
      if (err.message === 'Password should be at least 6 characters') errorMsg = 'A senha deve ter pelo menos 6 caracteres';
      if (err.message === 'User already registered') errorMsg = 'E-mail já cadastrado';
      triggerToast('error', errorMsg);
      console.log(err);
      return err.message;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUserStorage(null);
    navigate('/', { replace: true });
  };

  return {
    login,
    register,
    logout,
    user: userStorage,
    userStore,
  };
};
