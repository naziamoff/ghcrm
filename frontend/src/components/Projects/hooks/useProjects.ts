import { useCallback, useState } from 'react';
import { Project } from '../typedefs/Project';
import { ProjectRoutes } from '../typedefs/ProjectRoutes';
import { api } from '../../../api';

interface UseProjectsHookResult {
  projects: Project[];
  loading?: boolean;
  fetchProjects: () => Promise<void>;
  handleDelete: (id: string) => void;
  handleAddProject: (repoPath: string) => void;
  handleUpdate: (id: string) => void;
}

export const useProjects = (): UseProjectsHookResult => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProjects = useCallback(async () => {
    setLoading(true);

    try {
      const { data } = await api.get(`/${ProjectRoutes.Index}`);

      setProjects(data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    try {
      const { data } = await api.delete(`/${ProjectRoutes.Index}/${id}`);

      if (data.id) {
        setProjects((prev) => prev.filter((project) => project.id !== id));
      }
    } catch (error) {
      console.error('Delete failed:', error);
    }
  }, []);

  const handleAddProject = useCallback(async (repoPath: string) => {
    try {
      const { data: newProject } = await api.post(
        `/${ProjectRoutes.Create}`,
        { path: repoPath },
      );

      setProjects((prevProjects) => [...prevProjects, newProject]);
    } catch (error) {
      console.error('Failed to add project:', error);
    }
  }, [projects, setProjects]);

  const handleUpdate = useCallback(async (id: string) => {
    try {
      const { data } = await api.get(`/${ProjectRoutes.Refresh}/${id}`);

      setProjects((prevProjects) => prevProjects.map(
        (project) => (
          project.id === data.id
            ? data
            : project
        ),
      ));
    } catch (error) {
      console.error('Update failed:', error);
    }
  }, []);

  return {
    projects,
    loading,
    fetchProjects,
    handleDelete,
    handleAddProject,
    handleUpdate,
  };
};
