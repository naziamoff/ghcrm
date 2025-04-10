import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthRoutes } from '../typedefs/authRoutes';
import { api } from '../../../api';

export const useConfirmEmail = () => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const token = queryParams.get('token');
  const email = queryParams.get('email');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const confirmEmail = async () => {
    const route = `${AuthRoutes.ConfirmEmail}?token=${token}&email=${email}`;

    try {
      await api.get(route);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { confirmEmail, loading, error };
};
