import { useCallback } from 'react';
import { api } from '../../../api';
import { ENDPOINTS } from '../../../constants/endpoints';
import { useProjectsContext } from './useProjectsContext';
import { useProjectsStoreController } from './useProjectsStoreController';
import { usePollById } from './usePollById';
import { Project } from '../typedefs/Project';

export const useHandleUpdate = () => {
  const { updateProject, deleteProject } = useProjectsStoreController();
  const { pollById } = usePollById();

  const setError = useProjectsContext((state) => state.setError);

  const handleUpdate = useCallback(
    async (id: number) => {
      setError(null);

      try {
        const { data: newProject } = await api.get(
          `${ENDPOINTS.projects.refresh}/${id}`,
        );

        const onPollingFinished = (polledProject: Project) => {
          updateProject(polledProject);
        };

        const onError = (error: Error) => {
          deleteProject(newProject.id);

          setError(error.message);
        };

        updateProject(newProject);

        pollById(newProject.id, onPollingFinished, onError);
      } catch (e: any) {
        setError(e.response?.data?.message);
      }
    },
    [setError, updateProject],
  );

  return { handleUpdate };
};
