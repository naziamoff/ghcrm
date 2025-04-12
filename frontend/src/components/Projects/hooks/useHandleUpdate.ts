import { useCallback } from 'react';
import { api } from '../../../api';
import { ENDPOINTS } from '../../../constants/endpoints';
import { useProjectsContext } from './useProjectsContext';

export const useHandleUpdate = () => {
  const setProjects = useProjectsContext((state) => state.setProjects);
  const setError = useProjectsContext((state) => state.setError);

  const handleUpdate = useCallback(async (id: number) => {
    setError(null);

    try {
      const { data } = await api.get(`${ENDPOINTS.projects.refresh}/${id}`);

      setProjects((prevProjects) => (
        prevProjects.map((project) => (
          project.id === data.id
            ? data
            : project
        ))
      ));
    } catch (e: any) {
      setError(e.response?.data?.message);
    }
  }, [setError, setProjects]);

  return { handleUpdate };
};
