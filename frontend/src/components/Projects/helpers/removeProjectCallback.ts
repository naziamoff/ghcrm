import { Project } from '../typedefs/Project';

export const removeProjectCallback = (projects: Project[], projectId: number) =>
  projects.filter(({ id }) => id !== projectId);
