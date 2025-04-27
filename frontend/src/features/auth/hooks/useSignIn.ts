import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../api';
import { ENDPOINTS } from '../../../constants/endpoints';
import { ROUTES } from '../../../constants/routes';

export const useSignIn = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signIn = async (
    email: string,
    password: string,
  ) => {
    setError('');

    try {
      setLoading(true);

      const response = await api.post(
        ENDPOINTS.auth.signIn,
        { email, password },
      );

      if (response.status === 200) {
        navigate(ROUTES.projects.index);
      }
    } catch (err: any) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return { signIn, error, loading };
};
