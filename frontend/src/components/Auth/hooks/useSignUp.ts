import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthRoutes } from '../typedefs/authRoutes';
import { api } from '../../../api';

export const useSignUp = () => {
  const baseUrl = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setIsSuccess] = useState(false);

  const signUp = async (
    email: string,
    password: string,
    confirmPassword: string,
  ) => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const route = `${baseUrl}/${AuthRoutes.SignUp}`;

    try {
      await api.post(route, { email, password });

      setIsSuccess(true);
      setError('');
      navigate('/auth/confirm-email');
    } catch (err: any) {
      setError(err.message);

      setIsSuccess(false);
    }
  };

  return { signUp, success, error };
};
