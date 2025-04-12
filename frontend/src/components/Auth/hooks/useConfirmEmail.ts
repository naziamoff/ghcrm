import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '../../../api';
import { ENDPOINTS } from '../../../constants/endpoints';

export const useConfirmEmail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const token = queryParams.get('token');
  const email = queryParams.get('email');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const confirmEmail = async () => {
    const endpoint = ENDPOINTS.auth.confirmEmail;
    const route = `${endpoint}?token=${token}&email=${email}`;

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
