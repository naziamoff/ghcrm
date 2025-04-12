import { useProjectsContext } from './useProjectsContext';
import { usePollById } from './usePollById';
import { useCallback } from 'react';
import { api } from '../../../api';
import { ENDPOINTS } from '../../../constants/endpoints';
import { Project } from '../typedefs/Project';

export const useAddProject = () => {
  const setProjects = useProjectsContext((state) => state.setProjects);
  const setError = useProjectsContext((state) => state.setError);

  const { pollById } = usePollById();

  const handleAddProject = useCallback(async (repoPath: string) => {
    setError(null);
    try {
      const { data: newProject } = await api.post(
        ENDPOINTS.projects.create,
        { path: repoPath },
      );

      const onPollingFinished = (polledProject: Project) => {
        setProjects((prevProjects) => prevProjects.map(
          (existingProject) => existingProject.id === newProject.id
            ? polledProject
            : existingProject,
        ));
      };

      setProjects((prevProjects) => [...prevProjects, newProject]);

      pollById(newProject.id, onPollingFinished);
    } catch (e: any) {
      setError(e.response?.data?.message);
    }
  }, [setError, setProjects, pollById]);

  return { handleAddProject };
};
