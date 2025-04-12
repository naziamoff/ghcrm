import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthRoutes } from '../typedefs/authRoutes';
import { api } from '../../../api';

export const useSignUp = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setIsSuccess] = useState(false);

  const signUp = async (
    email: string,
    password: string,
    confirmPassword: string,
  ) => {
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      await api.post(AuthRoutes.SignUp, { email, password });

      setIsSuccess(true);
      setError('');
      navigate('/auth/confirm-email');
    } catch (err: any) {
      setError(err.response.data.message);

      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return { signUp, success, error, isLoading };
};
