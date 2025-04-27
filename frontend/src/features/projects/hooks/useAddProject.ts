import { useProjectsContext } from './useProjectsContext';
import { usePollById } from './usePollById';
import { useCallback } from 'react';
import { api } from '../../../api';
import { ENDPOINTS } from '../../../constants/endpoints';
import { Project } from '../typedefs/Project';
import { useProjectsStoreController } from './useProjectsStoreController';

export const useAddProject = () => {
  const { deleteProject, updateProject, addProject } =
    useProjectsStoreController();
  const setError = useProjectsContext((state) => state.setError);

  const { pollById } = usePollById();

  const handleAddProject = useCallback(
    async (repoPath: string) => {
      setError(null);

      try {
        const { data: newProject } = await api.post(ENDPOINTS.projects.create, {
          path: repoPath,
        });

        const onPollingFinished = (polledProject: Project) => {
          updateProject(polledProject);
        };

        const onError = (error: Error) => {
          deleteProject(newProject.id);

          setError(error.message);
        };

        addProject(newProject);

        pollById(newProject.id, onPollingFinished, onError);
      } catch (e: any) {
        setError(e.response?.data?.message);
      }
    },
    [setError, addProject, pollById, updateProject, deleteProject],
  );

  return { handleAddProject };
};
