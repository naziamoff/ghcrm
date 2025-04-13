import { useProjectsContext } from './useProjectsContext';
import { updateProjectCallback } from '../helpers/updateProjectCallback';
import { Project } from '../typedefs/Project';
import { removeProjectCallback } from '../helpers/removeProjectCallback';
import { useCallback } from 'react';

export const useProjectsStoreController = () => {
  const setProjects = useProjectsContext((state) => state.setProjects);

  const deleteProject = useCallback(
    (projectId: number) => {
      setProjects((prevProjects) =>
        removeProjectCallback(prevProjects, projectId),
      );
    },
    [setProjects],
  );

  const updateProject = useCallback(
    (updatedProject: Project) => {
      setProjects((prevProjects) =>
        updateProjectCallback(prevProjects, updatedProject),
      );
    },
    [setProjects],
  );

  const addProject = useCallback(
    (project: Project) => {
      setProjects((prevProjects) => [...prevProjects, project]);
    },
    [setProjects],
  );

  const setProjectsList = useCallback(
    (projects: Project[]) => {
      setProjects(projects);
    },
    [setProjects],
  );

  return {
    updateProject,
    deleteProject,
    addProject,
    setProjectsList,
  };
};
