import { Project } from '../typedefs/Project';

export const updateProjectCallback = (
  projects: Project[],
  newProject: Project,
) =>
  projects.map((project) =>
    project.id === newProject.id ? newProject : project,
  );
