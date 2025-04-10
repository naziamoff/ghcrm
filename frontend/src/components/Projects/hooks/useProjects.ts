import { useCallback, useState } from 'react';
import { Project } from '../typedefs/Project';
import { ProjectRoutes } from '../typedefs/ProjectRoutes';
import { api } from '../../../api';
import { usePollById } from './usePollById';

interface UseProjectsHookResult {
  projects: Project[];
  loading?: boolean;
  fetchProjects: () => Promise<void>;
  handleDelete: (id: number) => void;
  handleAddProject: (repoPath: string) => void;
  handleUpdate: (id: number) => void;
  error: string | null;
}

export const useProjects = (): UseProjectsHookResult => {
  const { pollById } = usePollById();

  const [error, setError] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProjects = useCallback(async () => {
    setError(null);
    setLoading(true);

    try {
      const { data } = await api.get(ProjectRoutes.Index);

      setProjects(data);
    } catch (e: any) {
      setError(e.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = useCallback(async (id: number) => {
    setError(null);
    try {
      const { data } = await api.delete(`${ProjectRoutes.Index}/${id}`);

      if (data.id) {
        setProjects(
          (prev) => prev.filter((project) => project.id !== id),
        );
      }
    } catch (e: any) {
      setError(e.response?.data?.message);
    }
  }, []);

  const handleAddProject = useCallback(async (repoPath: string) => {
    setError(null);
    try {
      const { data: newProject } = await api.post(
        ProjectRoutes.Create,
        { path: repoPath },
      );

      const onPollingFinished = (polledProject: Project) => {
        setProjects((prevProjects) => prevProjects.map(
          (existingProject) => {
            return existingProject.id === newProject.id
              ? polledProject
              : existingProject;
          }));
      };

      setProjects((prevProjects) => [...prevProjects, newProject]);

      pollById(newProject.id, onPollingFinished);
    } catch (e: any) {
      setError(e.response?.data?.message);
    }
  }, [setProjects, pollById]);

  const handleUpdate = useCallback(async (id: number) => {
    setError(null);
    try {
      const { data } = await api.get(`${ProjectRoutes.Refresh}/${id}`);

      setProjects((prevProjects) => prevProjects.map(
        (project) => (
          project.id === data.id
            ? data
            : project
        ),
      ));
    } catch (e: any) {
      setError(e.response?.data?.message);
    }
  }, []);

  return {
    error,
    projects,
    loading,
    fetchProjects,
    handleDelete,
    handleAddProject,
    handleUpdate,
  };
};
