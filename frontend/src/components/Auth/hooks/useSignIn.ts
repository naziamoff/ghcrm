import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthRoutes } from '../typedefs/authRoutes';
import { ROUTES } from '../../../routes';
import { api } from '../../../api';

export const useSignIn = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signIn = async (
    email: string,
    password: string,
  ) => {
    try {
      setLoading(true);

      const response = await api.post(
        AuthRoutes.SignIn,
        { email, password },
      );

      if (response.status === 200) {
        setError('');
        navigate(ROUTES.Projects);
      }
    } catch (err: any) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return { signIn, error, loading };
};
