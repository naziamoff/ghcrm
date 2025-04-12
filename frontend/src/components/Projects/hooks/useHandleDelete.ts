import { useCallback } from 'react';
import { api } from '../../../api';
import { ENDPOINTS } from '../../../constants/endpoints';
import { useProjectsContext } from './useProjectsContext';

export const useHandleDelete = () => {
  const setProjects = useProjectsContext((state) => state.setProjects);
  const setError = useProjectsContext((state) => state.setError);

  const handleDelete = useCallback(async (id: number) => {
    setError(null);

    try {
      const { data } = await api.delete(`${ENDPOINTS.projects.index}/${id}`);

      if (data.id) {
        setProjects((prevProjects) => (
          prevProjects.filter((project) => project.id !== id)
        ));
      }
    } catch (e: any) {
      setError(e.response?.data?.message);
    }
  }, [setError, setProjects]);

  return { handleDelete };
};
