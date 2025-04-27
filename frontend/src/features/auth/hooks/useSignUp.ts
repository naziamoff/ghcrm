import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../api';
import { ENDPOINTS } from '../../../constants/endpoints';
import { ROUTES } from '../../../constants/routes';

export const useSignUp = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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

    setError('');

    try {
      await api.post(ENDPOINTS.auth.signUp, { email, password });

      navigate(ROUTES.auth.confirmEmail);
    } catch (err: any) {
      setError(err.response.data.message);

    } finally {
      setIsLoading(false);
    }
  };

  return { signUp, error, isLoading };
};
