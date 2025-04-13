import { useCallback } from 'react';
import { api } from '../../../api';
import { ENDPOINTS } from '../../../constants/endpoints';
import { useProjectsContext } from './useProjectsContext';
import { useProjectsStoreController } from './useProjectsStoreController';

export const useFetchProjects = () => {
  const { setProjectsList } = useProjectsStoreController();
  const setError = useProjectsContext((state) => state.setError);
  const setIsLoading = useProjectsContext((state) => state.setIsLoading);

  const fetchProjects = useCallback(async () => {
    setError(null);
    setIsLoading(true);

    try {
      const { data } = await api.get(ENDPOINTS.projects.index);

      setProjectsList(data);
    } catch (e: any) {
      setError(e.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  }, [setError, setIsLoading, setProjectsList]);

  return { fetchProjects };
};
