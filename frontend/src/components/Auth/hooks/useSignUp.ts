import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthRoutes } from '../typedefs/authRoutes';
import { api } from '../../../api';

export const useSignUp = () => {
  const baseUrl = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();
  const [error, setHasError] = useState('');
  const [success, setIsSuccess] = useState(false);

  const signUp = async (
    email: string,
    password: string,
    confirmPassword: string,
  ) => {
    if (password !== confirmPassword) {
      setHasError('Passwords do not match');
      return;
    }

    const route = `${baseUrl}/${AuthRoutes.SignUp}`;

    try {
      const response = await api.post(route, { email, password });

      setIsSuccess(true);
      setHasError('');
      navigate('/auth/confirm-email');
    } catch (err: any) {
      setHasError('An error occurred while trying to sign up');
      setIsSuccess(false);
    }
  };

  return { signUp, success, error };
};
